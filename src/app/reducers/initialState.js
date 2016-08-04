export default {
  auth: {
    isAuthenticated: localStorage.getItem('JWT') ? true : false,
    user: {},
    isFetching: false,
    errorMessage: ''
  },
  poll: {},
  polls: [],
  failure: '',
  ajaxCallsInProgress: 0
};
