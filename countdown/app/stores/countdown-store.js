import * as R from 'ramda'
import * as Bacon from 'baconjs'
import ActionTypes from '../actions/action-types'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const updateState = func => (
  R.converge(R.assoc('state'), [
    func,
    R.identity,
  ])
)

const calcCountDownFromTick = ({ action }) => (
  Math.max(
    // remaining seconds.
    Math.ceil((action.to - action.current) / 1000),
    // can not be negative.
    0
  )
)

const whenStartTick = R.when(
  R.either(
    // if either starting to countdown or already ticking.
    isAction(ActionTypes.COUNTDOWN_START),
    isAction(ActionTypes.COUNTDOWN_TICK)
  ),
  // calculate the countdown in seconds.
  updateState(calcCountDownFromTick)
)

const whenStop = R.when(
  // if stopping the countdown.
  isAction(ActionTypes.COUNTDOWN_STOP),
  // zero at the end of countdown.
  updateState(R.always(0))
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(whenStartTick)
    .map(whenStop)
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
  StoreNames.COUNTDOWN, getReducer
)
