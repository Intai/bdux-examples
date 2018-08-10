import { PouchDBAction } from 'bdux-pouchdb'

export const syncPouchDB = () => (
  PouchDBAction.sync({
    src: 'states',
    target: 'http://localhost:5984/states',
    options: {
      live: true,
      retry: true
    }
  })
  .create()
)
