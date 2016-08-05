import React from 'react';
import { Button, Form, FormGroup, FieldGroup, Col, FormControl, ControlLabel, Grid, Row } from 'react-bootstrap';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(e) {
    e.preventDefault();
    this.props.signUp.signupUser(this.state);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Col xs={12} mdOffset={2}>
                <h1>Sign Up for Free</h1>
            </Col>
            <Form action="/" method="POST" horizontal>
              <FormGroup conrolId="formBasicText">
                <Col componentClass={ControlLabel}
                  sm={2}>
                    First Name:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="First Name"
                    onChange={e => this.setState({firstName: e.target.value})}
                  />
                </Col>
              </FormGroup>

              <FormGroup conrolId="formBasicText">
                <Col componentClass={ControlLabel}
                  sm={2}>
                    Last Name:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Last Name"
                    onChange={e => this.setState({lastName: e.target.value})}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    onChange={e => this.setState({email: e.target.value})}/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    onChange={e => this.setState({password: e.target.value})}/>
                </Col>
              </FormGroup>

              <FormGroup>
               <Col smOffset={2} sm={10}>
                <Button
                  type="submit"
                  bsStyle="primary"
                  onClick={this.handleForm}>
                  Get Started
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Grid>
    );
  }
}

export default SignUpForm;
