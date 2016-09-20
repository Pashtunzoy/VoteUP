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
      this.props.profileActions.getProfile().then(() => {
        console.log(this.props);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  handleProfileRender() {
    if (this.props.auth.isAuthenticated && this.props.auth.user) {
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
        {this.handleProfileRender()}
        {this.props.auth.isFetching && <h5>Loading...</h5>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return { auth: state.auth, user: state.auth.user };
}

function mapDispatchToProps(dispatch) {
  return { profileActions: bindActionCreators(profileActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
