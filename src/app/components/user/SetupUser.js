import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import * as signupActions from '../../actions/authActions/signupActions';
import * as loginActions from '../../actions/authActions/loginActions';

class SetupUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { signUp: true, login: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.target.text === 'Log In' ?
    this.setState({signUp: false, login: true})
    :
    this.setState({signUp: true, login: false});
  }

  isNotAuth() {
    const { signUp, login} = this.state;
    return (
      <div className="form">
        <ul className="tab-group">
          <li className={`tab ${signUp ? 'active' : ''}`}
            onClick={this.handleClick}>
            <a href="#">Sign Up</a>
          </li>
          <li className={`tab ${login ? 'active' : ''}`}
            onClick={this.handleClick}>
            <a href="#">Log In</a>
          </li>
        </ul>
        <div className="tab-content">
          { this.state.signUp && <SignUpForm signUp={this.props.signupActions}/> }
          { this.state.login && <LoginForm logIn={this.props.loginActions}/> }
        </div>
      </div>
    );
  }

  render () {
    // console.log(this.props);
    const authenticated = this.props.auth.isAuthenticated;
    return (
      <div>
        {!authenticated && this.isNotAuth() || authenticated && <Profile {...this.props.auth}/>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signupActions: bindActionCreators(signupActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupUser);
