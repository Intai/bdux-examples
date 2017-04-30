import R from 'ramda'
import Bacon from 'baconjs'
import Common from '../utils/common-util'
import ActionTypes from '../actions/action-types'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const isDiscoverUpdate = isAction(
  ActionTypes.DISCOVER_UPDATE
)

const isFromChanged = R.converge(
  R.complement(R.equals), [
    R.path(['action', 'from']),
    R.pathOr(-1, ['state', 'indices', 0])
  ]
)

const isCountChanged = R.converge(
  R.complement(R.equals), [
    R.path(['action', 'count']),
    R.pipe(
      R.pathOr([], ['state', 'indices']),
      R.length
    )
  ]
)

const isIndicesChanged = R.anyPass([
  isFromChanged,
  isCountChanged
]);

const isTopChanged = R.converge(
  R.complement(R.equals), [
    R.path(['action', 'top']),
    R.path(['state', 'top'])
  ]
)

const calcToIndex = R.converge(
  R.add, [
    R.prop('from'),
    R.prop('count')
  ]
)

const calcIndices = R.pipe(
  R.prop('action'),
  R.converge(
    R.range, [
      R.prop('from'),
      calcToIndex
    ]
  )
)

const updateScrollTop = R.converge(
  R.mergeWith(R.merge), [
    R.identity,
    R.pipe(
      R.prop('action'),
      R.pick(['scrollId', 'scrollTop']),
      R.objOf('state')
    )
  ]
)

const updateIndices = R.when(
  R.allPass([isDiscoverUpdate, isIndicesChanged]),
  R.pipe(
    Common.mergeState('indices', calcIndices),
    updateScrollTop
  )
)

const updateTop = R.when(
  R.allPass([isDiscoverUpdate, isTopChanged]),
  R.pipe(
    Common.mergeState('top', R.path(['action', 'top'])),
    updateScrollTop
  )
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(updateIndices)
    .map(updateTop)
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
