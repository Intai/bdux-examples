import * as Logger from 'bdux-logger';
import * as Isomorphic from 'bdux-isomorphic';
import { applyMiddleware } from 'bdux';

applyMiddleware(
  Isomorphic,
  Logger
);
