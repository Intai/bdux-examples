import * as R from 'ramda'
import Bacon from 'baconjs'
import ActionTypes from '../actions/action-types'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const updateConfig = R.when(
  isAction(ActionTypes.MOVIE_CONFIG),
  R.converge(
    R.assoc('state'), [
      R.path(['action', 'data']),
      R.identity
    ]
  )
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(updateConfig)
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
  StoreNames.CONFIG, getReducer
)
