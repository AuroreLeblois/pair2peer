/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, updateUser } from 'src/store/actions';
import { API_URI } from 'src/store/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_UPDATE_LANG: {
      const { data } = action;
      axios.patch(
        `${API_URI}/profile/languages`,
        data,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res.data);
          const data = res.data[0];
          store.dispatch(updateUser(data));
          sessionStorage.user = JSON.stringify(data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    case actions.DELETE_LANG: {
      const { language } = action;
      axios.delete(
        `${API_URI}/profile/languages/${language}`,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res.data);
          const data = res.data[0];
          store.dispatch(updateUser(data));
          sessionStorage.user = JSON.stringify(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    case actions.UPDATE_IT_LANG: {
      const { data } = action;
      console.log(data);
      axios.patch(
        `${API_URI}/profile/it_languages`,
        data,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res.data);
          const data = res.data[0];
          store.dispatch(updateUser(data));
          sessionStorage.user = JSON.stringify(data);
        })
        .catch((err) => {
          console.log(err.response);
        });
      return;
    }
    case actions.DELETE_IT_LANG: {
      const { itLanguage } = action;
      axios.delete(
        `${API_URI}/profile/it_languages/${itLanguage}`,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res.data);
          // const data = res.data[0];
          // store.dispatch(updateUser(data));
          // sessionStorage.user = JSON.stringify(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    case actions.UPDATE_PROFILE: {
      const { data } = action;
      console.log(data);
      axios.patch(
        `${API_URI}/update/profile`,
        data,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res.data);
          const data = res.data[0];
          store.dispatch(updateUser(data));
          sessionStorage.user = JSON.stringify(data);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        });
    }
    default: {
      next(action);
    }
  }
};
