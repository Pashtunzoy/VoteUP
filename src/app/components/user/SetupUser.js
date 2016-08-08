import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import * as signupActions from '../../actions/authActions/signupActions';
import * as loginActions from '../../actions/authActions/loginActions';
import { Navbar, Nav, NavItem, Grid, Col } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

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
    this.setState({activeIndex: e});
  }

  isNotAuth() {
    const {signUp, login} = this.state;
    return (
      <Grid>
        <Col xs={12} md={8} mdOffset={2}>
          <Nav bsStyle="tabs">
              <NavItem className={signUp ? 'active' : ''} onClick={this.handleClick}>Sign Up</NavItem>
              <NavItem className={login ? 'active' : ''} onClick={this.handleClick}>Log In</NavItem>
          </Nav>
          <div className="tab-content">
            {this.state.signUp && <SignUpForm signUp={this.props.signupActions}/>}
            {this.state.login && <LoginForm logIn={this.props.loginActions}/>}
          </div>
        </Col>
      </Grid>
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
