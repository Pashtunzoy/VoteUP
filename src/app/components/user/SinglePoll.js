import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pie } from 'react-chartjs';
import Chart from 'chartjs';
import * as pollActions from '../../actions/pollActions';
import Input from '../common/Input';

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
    this.props.actions.loadAPollById(this.props.params.id);
  }

  handleCheckClick(e, id) {
    this.setState({checkedValue: e.target.value, clickedId: id});
  }

  handleSumbit(e) {
    e.preventDefault();
    const id = this.state.clickedId;
    const chartId = this.props.params.id;
    this.props.actions.voteAnOpt(id, chartId)
      .then(data => {
        console.log(`This is the result ${data}`);
      }).catch(err => {
        console.log(`Didn't work & here is the error ${err}`);
      });
  }
  render () {
    const PieChart = Pie;
    return (
      <div>
        <h1>My Polls</h1>
        <PieChart data={this.props.options} options={this.state.chartOptions} width="600" height="250"/>
        <form>
          {
            this.props.options.map((opt, i) => {
              return  (<Input key={i} chartId={this.props.params.id} id={opt._id} type="radio" name={opt.label} value={opt.label} checkedValue={this.state.checkedValue} checkClick={this.handleCheckClick}/>);
            })
          }
          <button type="submit" onClick={this.handleSumbit}>VOTE</button>
        </form>
      </div>
    );
  }
}

SinglePoll.propTypes = {
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let options = [];
  let poll = {title: '', publicDisplay: true, _id: '', poll: []};
  if (state.poll.poll) {
    poll = state.poll;
    options = state.poll.poll;
  }
  return { poll, options };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(pollActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll);
