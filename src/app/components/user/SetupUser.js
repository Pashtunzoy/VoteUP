import React, { Component, PropTypes } from 'react';

class SetupUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { signUp: true, login: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.target.text === 'Log In' ?
    this.setState({signUp: false, login: true})
    :
    this.setState({signUp: true, login: false});
  }

  render () {
    const { signUp, login} = this.state;
    return (
      <div className="form">

        <ul className="tab-group">
          <li
            className={`tab ${signUp ? 'active' : ''}`}
            onClick={this.handleClick}
          >
            <a href="#">Sign Up</a>
          </li>
          <li
            className={`tab ${login ? 'active' : ''}`}
            onClick={this.handleClick}
          >
            <a href="#">Log In</a>
          </li>
        </ul>

        <div className="tab-content">
          {this.state.signUp &&
            <div id="signup">
              <h1>Sign Up for Free</h1>
              <form action="/" method="POST">
                <div className="top-row">
                  <div className="field-wrap">
                    <input type="text" required placeholder="First Name"/>
                  </div>
                  <div className="field-wrap">
                    <input type="text"required placeholder="First Name"/>
                  </div>
                </div>
                <div className="field-wrap">
                  <input type="email"required placeholder="Email Address"/>
                </div>
                <div className="field-wrap">
                  <input type="password"required placeholder="Set A Password"/>
                </div>
                <button type="submit" className="button button-block">Get Started</button>
              </form>
            </div>
            }

            {this.state.login &&
              <div id="login">
                <h1>Welcome Back!</h1>
              <form action="/" method="POST">
                <div className="field-wrap">
                  <input type="email"required placeholder="Email Address"/>
                </div>
                <div className="field-wrap">
                  <input type="password"required placeholder="Password"/>
                </div>
                <p className="forgot"><a href="#">Forgot Password?</a></p>
                <button className="button button-block">Log In</button>
              </form>
            </div>
          }
          </div>

      </div>
    );
  }
}

export default SetupUser;
