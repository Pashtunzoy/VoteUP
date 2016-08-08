import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class AboutPage extends React.Component {
  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={10} mdOffset={2}>
            <h1>VoteUP</h1>
            <h4>This application uses React, Redux, React Router for FRONTEND and NodeJs, ExpressJs, PassportJs, MongoDB, Mongoose & JWT Auth for BACKEND</h4>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AboutPage;
