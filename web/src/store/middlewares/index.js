import { applyMiddleware } from 'redux';

import authMW from './auth';
import routesMW from './routes';

export default applyMiddleware(
  authMW,
  routesMW,
);