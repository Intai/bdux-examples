import * as R from 'ramda'
import Bacon from 'baconjs'
import StoreNames from './store-names'
import { createStore } from 'bdux'
import { isPouchDBUpdate } from 'bdux-pouchdb'

const parseInt10 = (value) => (
  parseInt(value, 10)
)

const isValidEntry = R.useWith(
  R.whereEq, [
    R.pipe(
      R.pathOr({}, ['config', 'options', 'query_params']),
      R.filter(R.identity),
      R.evolve({
        year: parseInt10,
        month: parseInt10,
        day: parseInt10
      })
    ),
    R.identity,
  ]
)

const filterEntriesByAction = (args) => (
  R.merge(args, {
    state: R.filter(
      isValidEntry(args.action),
      args.state
    )
  })
)

const filterEntries = R.when(
  R.both(isPouchDBUpdate, R.propIs(Array, 'state')),
  filterEntriesByAction
)

export const getReducer = () => {
  const reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: reducerStream
      // filter entries by year, month, day and slug
      .map(filterEntries)
      .map(R.prop('state'))
  }
}

export default createStore(
  StoreNames.BLOG, getReducer
)
