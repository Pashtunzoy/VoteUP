import React from 'react';
import { Button } from 'react-bootstrap';

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
      <div id="signup">
        <h1>Sign Up for Free</h1>
        <form action="/" method="POST">
          <div className="top-row">
            <div className="field-wrap">
              <input type="text" required placeholder="First Name"
                onChange={e => this.setState({firstName: e.target.value})}
              />
            </div>
            <div className="field-wrap">
              <input type="text"required placeholder="Last Name"
                onChange={e => this.setState({lastName: e.target.value})}
              />
            </div>
          </div>
          <div className="field-wrap">
            <input type="email"required placeholder="Email Address"
              onChange={e => this.setState({email: e.target.value})}
            />
          </div>
          <div className="field-wrap">
            <input type="password"required placeholder="Set A Password"
              onChange={e => this.setState({password: e.target.value})}
            />
          </div>
          <Button type="submit" bsStyle="primary"
            onClick={this.handleForm}>
            Get Started
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
