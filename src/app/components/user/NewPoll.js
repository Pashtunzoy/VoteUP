import React, { PropTypes } from 'react';
import { v4 } from 'node-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pollActions from '../../actions/pollActions';
import { browserHistory } from 'react-router';
import NewPollInput from '../common/NewPollInput';
import { Button, Form, FormGroup, FieldGroup, Col, FormControl, ControlLabel, Grid, Row } from 'react-bootstrap';

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
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {id, title, display, poll} = this.state;
    const newPoll = {
      id,
      title,
      poll
    };
    this.props.actions.addNewPoll(newPoll)
    .then(poll => {
      // console.log(`The new poll from NewPoll container: ${poll}`);
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

  handleChange(e, id) {
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

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDeleteClick(e, id) {
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
      <Grid>
        <Row className="show-grid">
          <Form onSubmit={this.handleSubmit} horizontal>
            <Col sm={12} smOffset={2}>
              <h1>Add New Poll</h1>
            </Col>
            <FormGroup conrolId="formBasicText">
              <Col componentClass={ControlLabel}
                sm={2}>
                  <ControlLabel>Title:</ControlLabel>
              </Col>
              <Col sm={6}>
                <FormControl
                  type="text"
                  placeholder="Title Of Your Poll"
                  onChange={e => this.setState({title: e.target.value})}
                />
              </Col>
            </FormGroup>
                {
                  this.state.poll.map((poll, i) => {
                    return (
                        <FormGroup conrolId="formBasicText" key={i+1}>
                            <Col componentClass={ControlLabel}
                              sm={2}>
                                <ControlLabel>{`Option ${i+1}: `}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                              <FormControl
                                type='text'
                                placeholder="Enter Your Voting Option"
                                name={poll.label}
                                value={poll.label || ''}
                                onChange={(e) => this.handleChange(e, poll.id)}/>
                              <span
                                onClick={(e) => this.handleDeleteClick(e, poll.id)}>
                                &times;
                              </span>
                            </Col>
                        </FormGroup>
                    );
                  })
                }
              <Col sm={6} smOffset={2}>
                {this.state.error && <span>{this.state.error}</span>}
              </Col>
            <FormGroup>
              <Col sm={6} smOffset={2}>
              <Button type="submit" className="button-block btn-sub">
                Submit
              </Button>
              <Button onClick={this.addNewPollOpt}>Add New Option</Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Grid>
    );
  }
}

NewPoll.propTypes = {
  actions: PropTypes.object.isRequired
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
