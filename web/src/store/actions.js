// == URI from server
export const API_URI = 'http://localhost:3000';

// == Actions types
export const actions = {
  SUBMIT_LOGIN: 'actions/SUBMIT_LOGIN',
  SUBMIT_LOGOUT: 'actions/SUBMIT_LOGOUT',
  GET_LOGOUT: 'actions/GET_LOGOUT',
  GET_AUTHENTIFIED: 'actions/GET_AUTHENTIFIED',
  GET_USERS_LIST: 'actions/GET_USERS_LIST',
  GET_FILTERS_LIST: 'actions/GET_FILTERS_LIST',
  SUBMIT_FILTERS_SEARCH: 'actions/SUBMIT_FILTERS_SEARCH',
  SYNC_SEARCH_INPUTS: 'actions/SYNC_SEARCH_INPUTS',
  DISPLAY_ERRORS_MSG: 'actions/DISPLAY_ERRORS_MSG',
  CLEAR_ERRORS_MSG: 'actions/CLEAR_ERRORS_MSG',
  UPDATE_PROFILE: 'actions/UPDATE_PROFILE',
};

// == Actions creator

export const submitLogin = (history, data) => (
  { type: actions.SUBMIT_LOGIN, history, data }
);

export const submitLogout = (history) => (
  { type: actions.SUBMIT_LOGOUT, history }
);

export const getLogout = (history) => (
  { type: actions.GET_LOGOUT, history }
);

export const getAuthentified = (history, data) => (
  { type: actions.GET_AUTHENTIFIED, history, data }
);

export const getUsersList = (users) => (
  { type: actions.GET_USERS_LIST, users }
);

export const getFiltersList = (filters, maxUser) => (
  { type: actions.GET_FILTERS_LIST, filters, maxUser }
);

export const submitFiltersSearch = (users) => (
  { type: actions.SUBMIT_FILTERS_SEARCH, users }
);

export const syncSearchInputs = (name, value) => (
  { type: actions.SYNC_SEARCH_INPUTS, name, value }
);

export const displayErrorsMessages = (errors) => (
  { type: actions.DISPLAY_ERRORS_MSG, errors }
);

export const updateProfile = (data) => (
  { type: actions.UPDATE_PROFILE, data }
)
