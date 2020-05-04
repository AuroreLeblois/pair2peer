import { actions } from 'src/store/actions';

const initialState = {
  email: 'tony0@gmail.com',
  password: 'azertyui',
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
        usersData: action.users,
      };
    }
    case actions.GET_FILTERS_LIST: {
      return {
        ...state,
        filters: action.filters,
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
    default: {
      return state;
    }
  }
};
