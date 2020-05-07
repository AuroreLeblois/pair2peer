/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions } from 'src/store/actions';
import { API_URI } from 'src/store/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.UPDATE_PROFILE: {
      // const { data } = action;
      axios.patch(
        `${API_URI}/update/profile`,
        // data,
        { withCredentials: true },
      )
        .then((res) => {
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
