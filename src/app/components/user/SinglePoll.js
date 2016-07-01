import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { Pie } from 'react-chartjs';
import Chart from 'chartjs';
import { fakeChartData, fakeChartOptions, fetchPoll, fetchChartById, fetchPollOptById, addNewPollOpt, deletePollOpt } from '../../api/mockApiPolls';
import Input from '../common/Input';

class SinglePoll extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: {},
      poll: [],
      chartOptions: fakeChartOptions,
      checkedValue: '',
      clickedId: '',
      currentOpt: {}
    };

    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  componentDidMount() {
    fetchChartById(this.props.params.id).then(data =>
      this.setState({
        chartData: data[0],
        poll: data[0].poll
      })
    );
  }

  handleCheckClick(e, id) {
    console.log('Click');
    fetchPollOptById(id).then(opt => {
      this.setState({currentOpt: opt});
    });
    this.setState({checkedValue: e.target.value});
  }

  handleSumbit(e) {
    e.preventDefault();
    const allOpts = this.state.chartData.poll.map(opts => {
      if (this.state.currentOpt.id === opts.id) {
        opts.value = opts.value + 20;
      }
      return opts;
    })
    this.setState({poll: allOpts});
  }
  render () {
    const PieChart = Pie;
    return (
      <div>
        <h1>My Polls</h1>
        <PieChart data={this.state.poll} options={this.state.chartOptions} width="600" height="250"/>
        <form>
          {
            this.state.poll.map(opt => {
              return  (<Input key={opt.id} id={opt.id} type="radio" name={opt.label} value={opt.label} checkedValue={this.state.checkedValue} checkClick={this.handleCheckClick}/>)
            })
          }
          <button type="submit" onClick={this.handleSumbit}>VOTE</button>
        </form>
      </div>
    );
  }
}

export default SinglePoll;
