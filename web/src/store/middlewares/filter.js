/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, API_URI, headers } from 'src/store/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    // case actions.SUBMIT_LOGIN: {
    //   axios.post(
    //     API_URI + '/login', {
    //       email: store.getState().email,
    //       password: store.getState().password
    //     }, headers)
    //     .then((res) => {
    //       store.dispatch(getAuthentified(action.history, res.data))
    //       store.dispatch(syncLogin('password', ''))
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //   return;
    // }

    default: {
      next(action);
    }
  }
};
