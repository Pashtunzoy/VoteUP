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
  }

  componentDidMount() {
    fetchPoll().then(data => this.setState({chartData: data}));
  }

  render () {
    return (
      <div>
        <h1>My Polls</h1>
        <ul>
          {
            this.state.chartData.map(poll => <Link to={`poll/${poll.id}`} key={poll.id}><li>{poll.title}</li></Link> )
          }
        </ul>
      </div>
    );
  }
}

export default MyPolls;
