/* eslint-disable no-fallthrough */
import { actions } from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.GET_AUTHENTIFIED: {
      action.history.push('/');
      return next(action);
    }
    case actions.GET_LOGOUT: {
      action.history.push('/');
      return next(action);
    }
    case actions.REDIRECT_LOGIN: {
      action.history.push('/login');
      return next(action);
    }
    default: {
      next(action);
    }
  }
};
