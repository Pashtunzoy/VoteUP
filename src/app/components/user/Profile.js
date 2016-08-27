import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import * as profileActions from '../../actions/authActions/profileActions';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileRender = this.handleProfileRender.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      // console.log(this.props.user);
      this.props.profileActions.getProfile().then(() => {

      }).catch(err => {
        console.log(err);
      });
    }
  }

  handleProfileRender() {
    // {this.props.auth.user.data.email}
    // console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <h3>Authenticated User Profile</h3>
          <h1>Email: {this.props.auth.user.data.email}</h1>
        </div>
      );
    }
  }

  render() {
    const isFetching = this.props.auth.isFetching;
    return (
      <div>
        {isFetching && <h5>Loading...</h5> || this.handleProfileRender()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, user: state.auth.user };
}

function mapDispatchToProps(dispatch) {
  return { profileActions: bindActionCreators(profileActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
