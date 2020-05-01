import { actions } from 'src/store/actions';

const initialState = {
  email: '',
  password: '',
  user: {},
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
  users: {},
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.SYNC_LOGIN: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case actions.GET_AUTHENTIFIED: {
      return {
        ...state,
        user: action.data,
      };
    }
    case actions.GET_USERS_LIST: {
      return {
        ...state,
        users: action.users,
      };
    }
    case actions.GET_FILTERS_LIST: {
      return {
        ...state,
        filters: action.filters,
      };
    }
    default: {
      return state;
    }
  }
};
