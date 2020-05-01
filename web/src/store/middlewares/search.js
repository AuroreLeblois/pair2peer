/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, API_URI, getFiltersList, getUsersList } from 'src/store/actions';
import { getFiltersData } from 'src/store/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.POST_SEARCH: {
      axios.all([
        axios.post(
          `${API_URI}/search?page_nb=1&user_nb=10`, store.getState().search, { withCredentials: true },
        ),
        axios.get(
          `${API_URI}/search`, { withCredentials: true },
        ),
      ])
        .then(axios.spread((postRes, getRes) => {
          const filters = getFiltersData(getRes.data);
          store.dispatch(getFiltersList(filters));
          store.dispatch(getUsersList(postRes.data));
        }))
        .catch((err) => {
          console.log(err.response);
        });
      return;
    }
    default: {
      next(action);
    }
  }
};
