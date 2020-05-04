// == URI from server
export const API_URI = 'http://localhost:3000';

// == Actions types
export const actions = {
  SYNC_LOGIN: 'action/SYNC_LOGIN',
  SUBMIT_LOGIN: 'actions/SUBMIT_LOGIN',
  GET_AUTHENTIFIED: 'actions/GET_AUTHENTIFIED',
  GET_USERS_LIST: 'actions/GET_USERS_LIST',
  GET_FILTERS_LIST: 'actions/GET_FILTERS_LIST',
  SUBMIT_FILTERS_SEARCH: 'actions/SUBMIT_FILTERS_SEARCH',
  SYNC_SEARCH_INPUTS: 'actions/SYNC_SEARCH_INPUTS',
  DISPLAY_ERRORS_MSG: 'actions/DISPLAY_ERRORS_MSG',
};

// == Actions creator

export const syncLogin = (name, value) => (
  { type: actions.SYNC_LOGIN, name, value }
);

export const submitLogin = (history) => (
  { type: actions.SUBMIT_LOGIN, history }
);

export const getAuthentified = (history, data) => (
  { type: actions.GET_AUTHENTIFIED, history, data }
);

export const getUsersList = (users) => (
  { type: actions.GET_USERS_LIST, users }
);

export const getFiltersList = (filters) => (
  { type: actions.GET_FILTERS_LIST, filters }
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
