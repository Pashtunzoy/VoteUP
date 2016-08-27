import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pie } from 'react-chartjs';
import Chart from 'chartjs';
import toastr from 'toastr';
import * as pollActions from '../../actions/pollActions';
import * as profileActions from '../../actions/authActions/profileActions';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Grid, Row, Radio, Nav } from 'react-bootstrap';

import { fakeChartOptions, voteInput } from '../../api/mockApiPolls';

class SinglePoll extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartOptions: fakeChartOptions,
      checkedValue: '',
      clickedId: ''
    };

    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadAPollById(this.props.params.uId, this.props.params.id);
  }

  handleCheckClick(e, id, value) {
    this.setState({checkedValue: value, clickedId: id});
  }

  handleSumbit(e) {
    e.preventDefault();
    const id = this.state.clickedId;
    const chartId = this.props.params.id;
    if (!this.state.checkedValue) {
      toastr.error('Please select an option to Vote');
    } else {
      this.props.actions.voteAnOpt(this.props.params.uId, id, chartId)
      .then().catch(err => {
        toastr.error(`Your vote wasn't proccess because of this error: ${err}`);
      });
    }
  }
  render () {
    const PieChart = Pie;
    return (
      <Grid className="centerBlock">
        <Row className="show-grid">
          <Col xs={12} md={8} mdOffset={3} xsOffset={1}>
            <h1>Q: {this.props.poll.title}</h1>
            <Col mdOffset={2}>
              {!this.state.checkedValue && <h1>Cast your first Vote.</h1>}
              <PieChart data={this.props.options} options={this.state.chartOptions} width="300" height="300"/>
            </Col>
            <Form>
              <Nav>
                {
                  this.props.options.map((opt, i) => {
                    return  (
                      <Radio inline key={i} onChange={(e) => this.handleCheckClick(e, opt._id, opt.label)} checked={opt.label === this.state.checkedValue}>{opt.label}</Radio>
                    );
                  })
                }
              </Nav>
              <Button type="submit" onClick={this.handleSumbit}>VOTE</Button>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

SinglePoll.contextTypes = {
  router: React.PropTypes.object
};

SinglePoll.propTypes = {
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let options = [];
  let poll = {title: '', publicDisplay: true, _id: '', poll: []};
  if (state.poll.poll) {
    poll = state.poll || state.auth.user.data.polls;
    options = state.poll.poll;
  }
  return { poll, options };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pollActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll);
