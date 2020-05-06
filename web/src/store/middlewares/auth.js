/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getAuthentified, displayErrorsMessages, getLogout } from 'src/store/actions';
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
          store.dispatch(getAuthentified(action.history, res.data));
          store.dispatch({ type: actions.CLEAR_ERRORS_MSG });
        })
        .catch((err) => {
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
          store.dispatch(getLogout(action.history));
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
