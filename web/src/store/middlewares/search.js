/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getFiltersList } from 'src/store/actions';
import { API_URI } from 'src/store/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.POST_SEARCH: {
      // axios.post(
      //   `${API_URI}/search?page_nb=1&user_nb=10`,
      //   store.getState().search,
      //   { withCredentials: true },
      // )
      //   .then((res) => {
      //     console.log(res);
      //     const filters = getFiltersData(res.data);
      //     store.dispatch(getFiltersList(filters));
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //   });
      return;
    }
    default: {
      next(action);
    }
  }
};
