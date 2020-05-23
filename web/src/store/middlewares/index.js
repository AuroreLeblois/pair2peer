import { applyMiddleware } from 'redux';

import authMW from './auth';
import routesMW from './routes';
import searchMW from './search';
import signupMW from './signup';
import updateMW from './update';
import inboxMW from './inbox';
import contactMW from './contact';

export default applyMiddleware(
  authMW,
  routesMW,
  searchMW,
  signupMW,
  updateMW,
  inboxMW,
  contactMW,
);
