import React, { PropTypes } from 'react';
import { v4 } from 'node-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pollActions from '../../actions/pollActions';
import { browserHistory } from 'react-router';
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
          highlight: '#E01400',
          label: ''
        },
        {
          id: v4(),
          value: 0,
          color: '#E00000',
          highlight: '#F88888',
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
    };
    this.props.actions.addNewPoll(newPoll)
    .then(poll => {
      console.log(`The new poll from NewPoll container: ${poll}`);
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
  //  console.log(JSON.stringify(pollData));
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
        <form onSubmit={this.handleSubmit} className="form">
          <h1>Add New Poll</h1>
          <div className="tab-content">
            <label className="option-label">Title:</label>
            <br />
            <div>
              <NewPollInput type="text" placeholder="Title Of Your Poll" isTitle="true" name="Title" value={this.state.title} onTitleChange={this.handleTitleChange}/>
            </div>
          </div>
          <div>
            <br/>
            <label className="option-label">Options:</label>
            {
              this.state.poll.map((poll, i) => {
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
          <div className="pub-option">
            <label className="option-label">Want to make it public?</label>
            <NewPollInput type="checkbox" className="btn-check" name="display" checked={this.state.display} isCheckBox={true} onChange={this.handleCheckClick}/>
          </div>
          <button type="submit" className="button-block btn-sub">
            Submit
          </button>
          <input type="button" className="button-block btn-option" onClick={this.addNewPollOpt} value="Add New Option"/>
        </form>
      </div>
    );
  }
}

NewPoll.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pollActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewPoll);
