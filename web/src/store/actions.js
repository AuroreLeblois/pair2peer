// == URI from server
export const API_URI = 'http://localhost:3000';

// == Actions types
export const actions = {
  SYNC_LOGIN: 'action/SYNC_LOGIN',
  SUBMIT_LOGIN: 'actions/SUBMIT_LOGIN',
  GET_AUTHENTIFIED: 'actions/GET_AUTHENTIFIED',
  POST_SEARCH: 'actions/POST_SEARCH',
  GET_USERS_LIST: 'actions/GET_USERS_LIST',
  GET_FILTERS_LIST: 'actions/GET_FILTERS_LIST',
};

// == Actions creator

export const syncLogin = (name, value) => {
  return { type: actions.SYNC_LOGIN, name, value };
};

export const submitLogin = (history) => (
  { type: actions.SUBMIT_LOGIN, history }
);

export const getAuthentified = (history, data) => (
  { type: actions.GET_AUTHENTIFIED, history, data }
);

export const getUsers = () => (
  { type: actions.GET_USERS }
);

export const getFiltersList = (filters) => (
  { type: actions.GET_FILTERS_LIST, filters }
);

export const getUsersList = (users) => (
  { type: actions.GET_USERS_LIST, users }
);
