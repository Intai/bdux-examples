import * as Logger from 'bdux-logger'
import * as PouchDB from 'bdux-pouchdb'
import * as Universal from 'bdux-universal'
import { applyMiddleware } from 'bdux'

applyMiddleware(
  Universal,
  PouchDB,
  Logger
)
