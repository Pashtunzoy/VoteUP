import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { fetchPoll } from '../../api/mockApiPolls';
import Input from '../common/Input';

class MyPolls extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: [],
    };

    this.deletePoll = this.deletePoll.bind(this);
  }

  componentDidMount() {
    fetchPoll().then(data => this.setState({chartData: data}));
  }


  deletePoll(id) {
    let { chartData } = this.state;
    chartData = chartData.filter(chart => chart.id !== id);
    this.setState({chartData})
  }

  render () {
    return (
      <div>
        <h1>My Polls</h1>
        <ul>
          {
            this.state.chartData.map(poll =>
              <div key={poll.id}>
                <Link to={`poll/${poll.id}`}><li>{poll.title}</li></Link>
                <span onClick={(e) => this.deletePoll(poll.id)}>&times;</span>
              </div>
            )
          }
        </ul>
      </div>
    );
  }
}

export default MyPolls;
