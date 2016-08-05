import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as profileActions from '../../actions/authActions/profileActions';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileRender = this.handleProfileRender.bind(this);
  }

  componentWillMount() {
    this.props.profileActions.getProfile();
  }

  handleProfileRender() {
    if (this.props.auth.user.success) {
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
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return { profileActions: bindActionCreators(profileActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
