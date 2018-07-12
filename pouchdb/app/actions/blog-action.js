import ActionTypes from './action-types'
import { PouchDBAction } from 'bdux-pouchdb'
import { bindToDispatch } from 'bdux'

export const load = ({ props: { match: { params }}}) => {
  PouchDBAction.replicate({
    name: 'PDB_BLOG',
    src: 'http://localhost:5984/blog',
    target: 'blog',
    options: {
      auth: {
        username: 'guest',
        password: 'guest'
      },
      filter: 'blog/filter_entries',
      query_params: params
    }
  })

  return {
    type: ActionTypes.BLOG_LOAD,
    params
  };
}

export default bindToDispatch({
  load
})
