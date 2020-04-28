// == URI from server
export const API_URI = 'http://localhost:3000';

// == Headers to Ajax
export const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
}

// == Actions types
export const actions = {
  SYNC_LOGIN: 'action/SYNC_LOGIN',
  GET_USER: 'actions/GET_USER',
  SUBMIT_LOGIN: 'actions/SUBMIT_LOGIN',
  GET_AUTHENTIFIED: 'actions/GET_AUTHENTIFIED'
}

// == Actions creator

export const syncLogin = (name, value) => {
  return { type: actions.SYNC_LOGIN, name, value };
}

export const submitLogin = (history) => (
  { type: actions.SUBMIT_LOGIN, history }
);

export const getAuthentified = (history, data) => {
  return { type: actions.GET_AUTHENTIFIED, history, data }
}