import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import * as logoutActions from '../../actions/authActions/logoutActions';
import * as profileActions from '../../actions/authActions/profileActions';
import { Navbar, Nav, NavItem, MenuItem, SafeAnchor } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer, NavItemLink } from 'react-router-bootstrap';
import toastr from 'toastr';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Home'
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  componentDidMount() {
    if (!this.props.user && !this.props.authenticated) {
      this.props.profileActions.getProfile();
    }
  }

  handleLogout(e) {
    this.props.logoutActions.logoutUser();
    toastr.success('Successfuly Logged Out');
  }

  handleNav(e) {
    let linkName = e.target.text;
    this.setState({active: linkName});
  }
  render() {
    const {active} = this.state;
    let uId = '';
    if (this.props.user.data) {
      uId = this.props.user.data._id;
    }
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">VOTEUP</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <li className={active === 'Home' ? 'active' : ''}>
              <Link onClick={this.handleNav} to="/">Home</Link>
            </li>
            <li className={active === 'My Polls' ? 'active' : ''}>
              {this.props.authenticated && <Link onClick={this.handleNav} to={`/${uId}/polls`}>My Polls</Link>}
            </li>
            <li className={active === 'Add Poll' ? 'active' : ''}>
              {this.props.authenticated && <Link onClick={this.handleNav} to="/new">Add Poll</Link>}
            </li>
            <li className={active === 'User' ? 'active' : ''}>
              <Link onClick={this.handleNav} to="/auth">User</Link>
            </li>
            <li className={active === 'Logout' ? 'active' : ''}>
              {this.props.authenticated && <Link onClick={this.handleNav, this.handleLogout} to="#">Logout</Link>}
            </li>
            <li className={active === 'About' ? 'active' : ''}>
              <Link onClick={this.handleNav} to="/about">About</Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  logoutActions: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    router: state.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutActions: bindActionCreators(logoutActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
