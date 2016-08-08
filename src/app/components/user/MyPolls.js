import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pollsActions from '../../actions/pollsActions';
import * as pollActions from '../../actions/pollActions';
import * as profileActions from '../../actions/authActions/profileActions';
import { Link } from 'react-router';
import Input from '../common/Input';
import { Button, Col, Grid, Row } from 'react-bootstrap';

class MyPolls extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: props.polls
    };
    this.deletePoll = this.deletePoll.bind(this);
  }

  componentWillMount() {
    this.props.pollsActions.loadAllPolls();
  }

  deletePoll(id) {
    this.props.pollActions.deletePollById(this.props.params.uId, id)
      .then(data => {
        // console.log(data);
    });
    let { chartData } = this.state;
    chartData = chartData.filter(chart => chart.id !== id);
    this.setState({chartData});
  }

  render () {
    const {user} = this.props;
    let id = '';
    if (user.data) {
      id = user.data._id
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <h1>My Polls</h1>
            <ul>
              {
                this.props.polls.map(poll =>
                  <div key={poll._id}>
                    <Link to={`/${id}/poll/${poll._id}`}><li>{poll.title}</li></Link>
                    <span onClick={(e) => this.deletePoll(poll._id)}>&times;</span>
                  </div>
                )
              }
            </ul>
          </Col>
        </Row>
      </Grid>
    );
  }
}

MyPolls.propTypes = {
  polls: PropTypes.array.isRequired,
  pollsActions: PropTypes.object.isRequired,
  pollActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    polls: state.polls,
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollActions: bindActionCreators(pollActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPolls);
