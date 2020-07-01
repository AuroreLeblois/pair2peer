/* eslint-disable no-fallthrough */
import axios from 'axios';
import { actions, getUserInbox } from 'src/store/actions';
import { API_URI } from 'src/store/utils';


export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.SUBMIT_MESSAGE: {
      const { message, chatroom } = action;
      // Assign values from submitted form
      axios.post(
        `${API_URI}/chatroom/${chatroom}`,
        message,
        { withCredentials: true },
      )
        .then((res) => {
          console.log(res);
          store.dispatch(getUserInbox(res.data));
          store.dispatch({ type: actions.CLEAR_ERRORS_MSG });
          store.dispatch({ type: actions.SET_LOADER });
          sessionStorage.inbox = JSON.stringify(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          store.dispatch({ type: actions.SET_LOADER });
        });
      return;
    }
    default: {
      next(action);
    }
  }
};
