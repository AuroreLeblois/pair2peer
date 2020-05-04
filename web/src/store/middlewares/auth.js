/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getAuthentified, syncLogin, displayErrorsMessages } from 'src/store/actions';
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
          store.dispatch(getAuthentified(action.history, res.data));
          store.dispatch(syncLogin('password', ''));
          store.dispatch(displayErrorsMessages(''));
        })
        .catch((err) => {
          const data = err.response.data
          store.dispatch(displayErrorsMessages(data.message));
          console.log(err);
        });
      return;
    }
    default: {
      next(action);
    }
  }
};
