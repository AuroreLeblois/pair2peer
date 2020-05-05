/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getAuthentified, syncLogin, displayErrorsMessages, getLogout } from 'src/store/actions';
import { API_URI } from 'src/store/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_LOGIN: {
      axios.post(
        `${API_URI}/login`, {
          email: store.getState().email,
          password: store.getState().password,
        }, { withCredentials: true },
      )
        .then((res) => {
          // Redirection to '/', user in reponse to reducer state
          store.dispatch(getAuthentified(action.history, res.data));
          // store.dispatch(syncLogin('password', ''));
          store.dispatch(displayErrorsMessages(''));
        })
        .catch((err) => {
          const data = err.response.data
          store.dispatch(displayErrorsMessages(data.message));
          console.log(err);
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
          console.log(res);
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
