import * as types from './actionTypes';


export function createPollSuccess(poll) {
  return { type: types.CREATE_POLL_SUCCESS, poll };
}

export function createPollFailure(err) {
  return { type: types.CREATE_POLL_FAILURE, err };
}

export function deletePollSuccess(id) {
  return { type: types.DELETE_POLL_SUCCESS, id };
}

export function deletePollFailure(err) {
  return { type: types.DELETE_POLL_FAILURE, err };
}

export function loadAPollSuccess(poll) {
  return { type: types.LOAD_POLL_SUCCESS, poll};
}

export function loadAPollFailure(err) {
  return { type: types.LOAD_POLL_FAILURE, err};
}

export function voteAnOptSuccess(poll) {
  return { type: types.POLL_VOTE_SUCCESS, poll};
}

export function voteAnOptFailure(err) {
  return { type: types.POLL_VOTE_FAILURE, err};
}

export function deletePollById(id) {
  return (dispatch, getState) => {
    dispatch(deletePollSuccess(id));
    const _id = localStorage.user_id;
    return fetch(`${types.API_ENDPOINT}/${_id}/polls/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ''
      }
    ).then(res => {
      if (res.status === 404 ) {
          throw new Error("Bad response from server");
      }
      return res.json();
    }).then(poll => {
      console.log(`Posted a new poll: ${poll}`);
      return poll;
    }).catch(err => {
      console.log(`There was an error creating a new poll: ${err}`);
      dispatch(deletePollFailure(err));
    });
  };
}

export function addNewPoll(poll) {
  return (dispatch, getState) => {
    dispatch(createPollSuccess(poll));
    const _id = localStorage.user_id;
    return fetch(`${types.API_ENDPOINT}/${_id}/new`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify(getState().poll)
    }
    ).then(res => {
      if (res.status !== 201 ) {
          throw new Error("Bad response from server");
      }
      return res.json();
    }).then(poll => {
      console.log(`Posted a new poll: ${poll}`);
      return poll;
    }).catch(err => {
      console.log(`There was an error creating a new poll: ${err}`);
      dispatch(createPollFailure(err));
    });
  };
}

export function voteAnOpt(id, chartId) {
  return (dispatch, getState) => {
    const _id = localStorage.user_id;
    return fetch(`${types.API_ENDPOINT}/${_id}/polls/${chartId}/option/${id}`,
      {method: 'POST', headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: ''}
    )
    .then(res => {
      if (res.status >= 400) {
          throw new Error("Bad response from server");
      }
      return res.json()
    })
    .then((poll) => {
      dispatch(voteAnOptSuccess(poll));
      return getState().polls;
    }).catch((err) => {
      dispatch(voteAnOptFailure(err));
      console.log('Got error while getting poll: ', err);
      return err;
    });
  }
}

export function loadAPollById(id, dispatch) {
  return (dispatch, getState) => {
    console.log(getState());
    const _id = localStorage.user_id;
    return fetch(`${types.API_ENDPOINT}/${_id}/polls/${id}`)
      .then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json()
      })
      .then((poll) => {
        dispatch(loadAPollSuccess(poll));
      }).catch((err) => {
        dispatch(loadAPollFailure(err));
        console.log('Got error while getting poll: ', err);
      });
  }
}
