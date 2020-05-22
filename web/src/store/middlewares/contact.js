/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, displayErrorsMessages } from 'src/store/actions';
import { API_URI } from 'src/store/utils';


export default (store) => (next) => (action) => {
  switch (action.type) {
      case actions.SUBMIT_CONTACT: {
      console.log(action.data);
      const { data } = action;
      axios.post(
        `${API_URI}/contact`,
        data,
      )
        .then((res) => {
          console.log(res);
          store.dispatch({ type: actions.SET_LOADER });
          store.dispatch({ type: actions.CLEAR_ERRORS_MSG });
        })
      .catch((err) => {
          // Au cas où erreur avec le serveur, renvoie un console.log
          console.log(err.response);
          // store.dispatch({ type: actions.SET_LOADER });
          // const { message } = err.response.data;
          // store.dispatch(displayErrorsMessages(message));
        });

      return;
    }
    default: {
      next(action);
    }
  }
};
