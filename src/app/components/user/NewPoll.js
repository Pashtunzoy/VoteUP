import React, { PropTypes } from 'react';
import { v4 } from 'node-uuid';
import { browserHistory } from 'react-router';
import { addNewPoll, fetchPoll } from '../../api/mockApiPolls';
import NewPollInput from '../common/NewPollInput';

class NewPoll extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: v4(),
      title: '',
      display: false,
      poll: [
        {
          id: v4(),
          value: 0,
          color: '#F87525',
          highlight: '#F26525',
          label: ''
        },
        {
          id: v4(),
          value: 0,
          color: '#F87525',
          highlight: '#F26525',
          label: ''
        }
      ],
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewPollOpt = this.addNewPollOpt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {id, title, display, poll} = this.state;
    const newPoll = {
      id,
      title,
      display,
      poll
    }
    addNewPoll(newPoll).then(() => {
      // console.log(`New Poll Added: ${JSON.stringify(newPoll)}`);
      this.redirectSave();
    });
  }

  redirectSave() {
    this.context.router.push('/polls');
  }

  addNewPollOpt() {
    this.setState({error: null});
   let pollData = this.state.poll;
   const color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
   const highlight = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
   pollData = [...pollData, {id: v4(), value: 0, color: color, highlight: highlight, label: '' }];
   this.setState({poll: pollData});
  }

  handleChange(id, e) {
    // console.log(id);
    // console.log(e.target.value);
    const pollData = this.state.poll;
    pollData.map(poll => {
      if (poll.id === id) {
        return poll.label = e.target.value;
      }
      return poll;
    });
    this.setState({poll: pollData});
  }

  handleCheckClick(id, e) {
    this.setState({display: !this.state.display});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDeleteClick(id, e) {
    let pollData = this.state.poll;
    if (pollData.length <= 2) {
      return this.setState({error: "There must be an option remaining"});
    }
    this.setState({error: null});
    pollData = pollData.filter(poll => poll.id !== id);
    this.setState({poll: pollData});
  }
  render () {
    return (
      <div>
        <h1>Add New Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title:</label>
            <br />
            <NewPollInput type="text" placeholder="Title Of Your Poll" isTitle="true" name="Title" value={this.state.title} onTitleChange={this.handleTitleChange}/>
          </div>
          <div>
            <br/>
            <label>Options:</label>
            {
              this.state.poll.map((poll, i) => {
                // console.log(poll);
                return (
                    <NewPollInput
                      key={poll.id}
                      i={i+1}
                      id={poll.id}
                      type="text"
                      placeholder="Enter Your Voting Option"
                      name={poll.label}
                      value={poll.label || ''}
                      onChange={this.handleChange}
                      onClick={this.handleDeleteClick}
                    />
                );
              })
            }
            {this.state.error && <span>{this.state.error}</span>}
            <br/>
          </div>
          <div>
            <label>Want to make it public?</label>
            <NewPollInput type="checkbox" name="display" checked={this.state.display} isCheckBox={true} onChange={this.handleCheckClick}/>
          </div>
          <button type="submit">Submit</button><input type="button" onClick={this.addNewPollOpt} value="Add New Option"/>
        </form>
      </div>
    );
  }
}

NewPoll.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NewPoll;
