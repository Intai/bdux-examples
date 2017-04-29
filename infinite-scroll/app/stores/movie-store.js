import R from 'ramda'
import Bacon from 'baconjs'
import Common from '../utils/common-util'
import ActionTypes from '../actions/action-types'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const parseInt10 = (string) => (
  parseInt(string, 10)
)

const getIndex = R.pipe(
  R.prop('name'),
  R.match(/_([^_]*)$/),
  R.last,
  parseInt10
)

const isIndexMatch = R.converge(
  R.equals, [
    R.path(['action', 'index']),
    getIndex
  ]
)

const isMovieLoad = R.allPass([
  isAction(ActionTypes.MOVIE_LOAD),
  isIndexMatch,
])

const updateTitle = R.when(
  isMovieLoad,
  Common.mergeState('title',
    R.path(['action', 'data', 'title']))
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(updateTitle)
    .map(R.prop('state'))
)

const getInstance = (props) => ({
  name: `${StoreNames.MOVIE}_${props.index}`,
  isRemovable: true
})

export const getReducer = () => {
  const reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  }
}

export default createStore(
  getInstance, getReducer
)
