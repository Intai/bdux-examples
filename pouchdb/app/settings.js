import * as Logger from 'bdux-logger'
import * as PouchDB from 'bdux-pouchdb'
import * as Universal from 'bdux-universal'
import { applyMiddleware } from 'bdux'

PouchDB.config({
  sync: [{
    src: 'states',
    target: 'http://localhost:5984/states',
    options: {
      live: true,
      retry: true
    }
  }]
})

applyMiddleware(
  Universal,
  PouchDB,
  Logger
)
