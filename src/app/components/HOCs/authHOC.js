import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/auth');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/auth');
      }
    }


    render () {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.isAuthenticated };
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  Authentication.contextTypes = {
    router: React.PropTypes.object
  }

  return connect(mapStateToProps)(Authentication);
}
