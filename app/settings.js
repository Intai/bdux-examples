import * as Logger from 'bdux-logger'
import * as Timetravel from 'bdux-timetravel'
import { applyMiddleware } from 'bdux'

applyMiddleware(
  Timetravel,
  Logger
)
