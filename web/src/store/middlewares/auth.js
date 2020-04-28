/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getAuthentified, API_URI, headers } from 'src/store/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_LOGIN: {
      axios.post(
        API_URI + '/login', {
          email: store.getState().email,
          password: store.getState().password
        }, headers)
        .then((res) => {
          console.log('pouet')
          console.log(res.data)
          store.dispatch(getAuthentified(action.history, res.data))
        })
        .catch((err) => {
          console.log(err);
        })
      return;
    }

    default: {
      next(action);
    }
  }
};
