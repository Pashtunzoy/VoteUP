import React, { Component, PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
class HomePage extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>Welcome to VoteUP</h1>
        <h3>Where you can create beautiful Polls for people to vote.</h3>
      </Jumbotron>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
