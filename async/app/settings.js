import * as Logger from 'bdux-logger'
import * as Universal from 'bdux-universal/middleware'
import * as Timetravel from 'bdux-timetravel'
import { applyMiddleware } from 'bdux'

applyMiddleware(
  Universal,
  Timetravel,
  Logger
)
