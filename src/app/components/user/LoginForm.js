import React, {PropTypes} from 'react';
import toastr from 'toastr';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Grid, Row } from 'react-bootstrap';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.logIn.loginUser(this.state).then(data => {
      toastr.success('You successfully logged In.');
    }).catch((err) => {
      toastr.error(err);
    });
  }
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Col xs={12} mdOffset={2}>
                <h1>Welcome Back!</h1>
            </Col>
            <Form action="/" method="POST" horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email"
                      onChange={e => this.setState({email: e.target.value})}/>
                  </Col>
                </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password"
                    onChange={e => this.setState({password: e.target.value})}/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <p className="forgot"><a href="#">Forgot Password?</a></p>
                </Col>
              </FormGroup>

              <FormGroup>
               <Col smOffset={2} sm={10}>
                 <Button bsStyle="primary" onClick={this.handleLogin}>
                   Log In
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


LoginForm.propTypes = {
  logIn: PropTypes.object.isRequired
};

export default LoginForm;
