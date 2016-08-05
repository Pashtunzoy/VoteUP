import React, { Component, PropTypes } from 'react';
import { Jumbotron, Grid, Col, Row, Image } from 'react-bootstrap';
class HomePage extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={10} mdOffset={1}>
            <Jumbotron>
              <h1>Welcome to VoteUP</h1>
              <h3>Where you can create beautiful Polls for people to vote.</h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <Image src="http://lorempixel.com/400/200/" responsive/>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Col>
          <Col xs={6} md={4}>
            <Image src="http://lorempixel.com/400/200/sports/" responsive/>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Col>
          <Col xs={6} md={4}>
            <Image src="http://lorempixel.com/g/400/200" responsive/>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Col>
        </Row>
      </Grid>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
