/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getAuthentified, getUserInbox, displayErrorsMessages, getLogout } from 'src/store/actions';
import { API_URI } from 'src/store/utils';


export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_LOGIN: {
      // Assign values from submitted form
      const { data } = action;
      axios.post(
        `${API_URI}/login`,
        data,
        { withCredentials: true },
      )
        .then((res) => {
          // Redirection to '/', object { user } from reponse to reducer state
          const { data } = res;
          console.log(res);
          store.dispatch(getAuthentified(action.history, data.info));
          store.dispatch(getUserInbox(data.inbox));
          store.dispatch({ type: actions.SET_LOADER });
          store.dispatch({ type: actions.CLEAR_ERRORS_MSG });
          sessionStorage.user = JSON.stringify(data.info);
          sessionStorage.inbox = JSON.stringify(data.inbox);
        })
        .catch((err) => {
          console.log(err.response);
          store.dispatch({ type: actions.SET_LOADER });
          const { message } = err.response.data;
          store.dispatch(displayErrorsMessages(message));
        });
      return;
    }
    case actions.SUBMIT_LOGOUT: {
      axios.get(
        `${API_URI}/logout`,
        { withCredentials: true },
      )
        .then((res) => {
          window.sessionStorage.clear();
          store.dispatch(getLogout(action.history));
          store.dispatch({ type: actions.CLEAR_ERRORS_MSG });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
