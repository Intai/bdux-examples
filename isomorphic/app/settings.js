import * as Logger from 'bdux-logger';
import * as Isomorphic from 'bdux-isomorphic';
import * as Timetravel from 'bdux-timetravel';
import { applyMiddleware } from 'bdux';

applyMiddleware(
  Isomorphic,
  Timetravel,
  Logger
);
