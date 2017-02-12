import R from 'ramda'
import Bacon from 'baconjs'
import ActionTypes from '../actions/action-types'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const isDiscoverUpdate = isAction(
  ActionTypes.DISCOVER_UPDATE
)

const mergeState = (name, func) => R.converge(
  R.mergeWith(R.merge), [
    R.identity,
    R.pipe(
      func,
      R.objOf(name),
      R.objOf('state')
    )
  ]
)

const getCount = R.when(
  isDiscoverUpdate,
  mergeState('count',
    R.path(['action', 'discover', 'count']))
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(getCount)
    .map(R.prop('state'))
)

export const getReducer = () => {
  const reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  }
}

export default createStore(
  StoreNames.MOVIES, getReducer
)
