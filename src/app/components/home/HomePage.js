import React, { Component, PropTypes } from 'react';
import { fetchPoll } from '../../api/mockApiPolls';
import { Link } from 'react-router';

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      allPolls: []
    };
  }

  componentDidMount() {
    fetchPoll().then(data => this.setState({allPolls: data}));
  }

  render() {
    return (
      <div>
        <h1>Welcome to VoteUP</h1>
        <h3>Where you can create beautiful Polls for people to vote.</h3>
        <h2>Latest Public Polls</h2>
        <ul>
          {
            this.state.allPolls.map(poll => {
              if (poll.display) {
                return <Link to={`poll/${poll.id}`} key={poll.id}><li>{poll.title}</li></Link>;
              }
            })
          }
        </ul>
      </div>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
