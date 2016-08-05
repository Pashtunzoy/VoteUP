import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import * as logoutActions from '../../actions/authActions/logoutActions.js';
import { Navbar, Nav, NavItem, MenuItem, SafeAnchor } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutActions.logoutUser();
  }
  render() {
    console.log(this.props);
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
            <NavItem componentClass={Link} eventKey={3} href="/" to="/">Home</NavItem>
            {this.props.authenticated && <NavItem componentClass={Link} eventKey={2} href="/polls" to="/polls">My Polls</NavItem>}
            {this.props.authenticated && <NavItem componentClass={Link} eventKey={1} href="/new" to="/new">Add Poll</NavItem>}
            <NavItem componentClass={Link} eventKey={3} href="/auth" to="/auth">User</NavItem>
            {this.props.authenticated && <NavItem componentClass={Link} onClick={this.handleLogout} href="#" to="#">Logout</NavItem>}
            <NavItem componentClass={Link} eventKey={5} href="/about" to="/about">About</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// Header.propTypes = {
//   loading: PropTypes.bool.isRequired
// };

function mapStateToProps(state) {
  return { authenticated: state.auth.isAuthenticated }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutActions: bindActionCreators(logoutActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
