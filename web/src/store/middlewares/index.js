import { applyMiddleware } from 'redux';

import authMW from './auth';
import routesMW from './routes';
import searchMW from './search';

export default applyMiddleware(
  authMW,
  routesMW,
  searchMW,
);
