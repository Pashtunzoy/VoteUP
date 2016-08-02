import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pollsActions from '../../actions/pollsActions';
import * as pollActions from '../../actions/pollActions';
import { Link } from 'react-router';
import Input from '../common/Input';

class MyPolls extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: props.polls
    };
    this.deletePoll = this.deletePoll.bind(this);
  }

  componentDidMount() {
    this.props.pollsActions.loadAllPolls();
  }

  deletePoll(id) {
    this.props.pollActions.deletePollById(id)
      .then(data => {
        console.log(data);
    });
    let { chartData } = this.state;
    chartData = chartData.filter(chart => chart.id !== id);
    this.setState({chartData});
  }

  render () {
    console.log(this.props.polls);
    return (
      <div>
        <h1>My Polls</h1>
        <ul>
          {
            this.props.polls.map(poll =>
              <div key={poll._id}>
                <Link to={`poll/${poll._id}`}><li>{poll.title}</li></Link>
                <span onClick={(e) => this.deletePoll(poll._id)}>&times;</span>
              </div>
            )
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollActions: bindActionCreators(pollActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPolls);
