import * as Logger from 'bdux-logger'
import * as Universal from 'bdux-universal'
import { applyMiddleware } from 'bdux'

applyMiddleware(
  Universal,
  Logger
)
