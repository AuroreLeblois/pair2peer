import omit from 'object.omit';
import { actions } from 'src/store/actions';

const initialState = {
  search: {
    remote: '',
    language: '',
    country: '',
    city: '',
    it_language: '',
    level: '',
  },
  filters: {
    it_language: [],
    language: [],
    localisation: [],
  },
  usersData: {},
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_AUTHENTIFIED: {
      return {
        ...state,
        user: action.data,
      };
    }
    case actions.GET_LOGOUT: {
      return omit({ ...state }, 'user');
    }
    case actions.GET_USERS_LIST: {
      return {
        ...state,
        usersData: action.users,
      };
    }
    case actions.GET_FILTERS_LIST: {
      console.log(action)
      return {
        ...state,
        filters: action.filters,
        usersData: action.maxUser,
      };
    }
    case actions.SUBMIT_FILTERS_SEARCH: {
      return {
        ...state,
        usersData: actions.users,
      };
    }
    case actions.SYNC_SEARCH_INPUTS: {
      return {
        ...state,
        search: {
          ...state.search,
          [action.name]: action.value,
        },
      };
    }
    case actions.DISPLAY_ERRORS_MSG: {
      return {
        ...state,
        errors: action.errors,
      };
    }
    case actions.CLEAR_ERRORS_MSG: {
      return omit({ ...state }, 'errors');
    }
    default: {
      return state;
    }
  }
};
