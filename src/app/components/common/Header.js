import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import * as logoutActions from '../../actions/authActions/logoutActions';
import * as profileActions from '../../actions/authActions/profileActions';
import { Navbar, Nav, NavItem, MenuItem, SafeAnchor } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer, NavItemLink } from 'react-router-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  componentDidMount() {
    if (!this.props.user.data && this.props.authenticated) {
      this.props.profileActions.getProfile();
    }
  }

  handleLogout(e) {
    this.props.logoutActions.logoutUser();
  }

  handleNav(e) {
    // console.log(e.target.href.split('/'));
  }
  render() {
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
          <Nav activeKey={1} onClick={this.handleNav}>
            <NavItem componentClass={Link} eventKey={1} href="/" to="/">Home</NavItem>
             {this.props.authenticated && <NavItem componentClass={Link} eventKey={4} href={`/${uId}/polls`} to={`/${uId}/polls`}>My Polls</NavItem>}
             {this.props.authenticated && <NavItem componentClass={Link} eventKey={5} href="/new" to="/new">Add Poll</NavItem>}
             <NavItem componentClass={Link} eventKey={3} href="/auth" to="/auth">User</NavItem>
             {this.props.authenticated && <NavItem componentClass={Link} onClick={this.handleLogout} href="#" to="#">Logout</NavItem>}
             <NavItem componentClass={Link} eventKey={2} href="/about" to="/about">About</NavItem>
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
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutActions: bindActionCreators(logoutActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
