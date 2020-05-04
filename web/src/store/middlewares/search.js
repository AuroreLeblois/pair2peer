/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, submitFiltersSearch } from 'src/store/actions';
import { API_URI } from 'src/store/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_FILTERS_SEARCH: {
      axios.post(
        `${API_URI}/search?page_nb=1&user_nb=12`,
        store.getState().search,
        { withCredentials: true },
      )
        .then((res) => {
          const data = res.data;
          const users = {};
          users.maxPage = data.maxPage.count;
          users.maxUsers = data.maxUser.count;
          users.users = data.users;
          store.dispatch(submitFiltersSearch(users));
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
