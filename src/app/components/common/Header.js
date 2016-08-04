import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import * as logoutActions from '../../actions/authActions/logoutActions.js';

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
      <header>
        <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/new" activeClassName="active">Add Poll</Link>
          {" | "}
          <Link to="/polls" activeClassName="active">MyPolls</Link>
          {" | "}
          <Link to="/auth" activeClassName="active">User</Link>
          {" | "}
          {this.props.authenticated
            && <a href="#" activeClassName="active" onClick={this.handleLogout}>Logout</a>}
          {" | "}
          <Link to="/about" activeClassName="active">About</Link>
        </nav>
      </header>
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
