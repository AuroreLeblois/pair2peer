/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getAuthentified, displayErrorsMessages } from 'src/store/actions';
import { API_URI } from 'src/store/utils';


export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_SIGNUP: {
      console.log(action.data);
      // Assign values from submitted form
      const { data } = action;
      axios.post(
        `${API_URI}/signup`,
        data,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res);
          // Redirection to '/', object { user } from reponse to reducer state
          store.dispatch(getAuthentified(action.history, res.data));
          store.dispatch({ type: actions.CLEAR_ERRORS_MSG });
        })
        .catch((err) => {
          console.log(err.response);
          const { message } = err.response.data;
          store.dispatch(displayErrorsMessages(message));
        });
      return;
    }
    default: {
      next(action);
    }
  }
};
