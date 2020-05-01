import { actions } from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case actions.GET_AUTHENTIFIED: {
      action.history.push('/profile');
    }
    default: {
      next(action);
    }
  }
};
