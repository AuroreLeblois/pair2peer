import { actions } from 'src/store/actions'

const initialState = {
  email: '',
  password: '',
  user: {},
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.SYNC_LOGIN: {
      return {
        ...state,
        [action.name]: action.value
      }
    }
    case actions.GET_AUTHENTIFIED: {
      return {
        ...state,
        user: action.data
      }
    }
    default: {
      return state;
    }
  }
};
