import R from 'ramda'
import Bacon from 'baconjs'
import Common from '../utils/common-util'
import ActionTypes from '../actions/action-types'
import StoreNames from './store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const isLap =  isAction(
  ActionTypes.STOPWATCH_LAP
)

const isReset =  isAction(
  ActionTypes.STOPWATCH_RESET
)

const isStart =  isAction(
  ActionTypes.STOPWATCH_START
)

const isStop =  isAction(
  ActionTypes.STOPWATCH_STOP
)

const isTick =  isAction(
  ActionTypes.STOPWATCH_TICK
)

const mergeState = (name, func) => (
  R.converge(R.mergeWith(R.merge), [
    R.identity,
    R.pipe(
      func,
      R.objOf(name),
      R.objOf('state')
    )
  ])
)

const recordLap = ({ state }) => (
  R.append(state.timeTo, state.laps)
)

const lap = R.when(
  isLap,
  mergeState('laps',
    recordLap)
)

const reset = R.when(
  isReset,
  mergeState('timeTo',
    R.path(['state', 'timeFrom']))
)

const resetLaps = R.when(
  isReset,
  mergeState('laps',
    R.empty)
)

const start = R.when(
  isStart,
  mergeState('isTicking',
    R.always(true))
)

const stop = R.when(
  isStop,
  mergeState('isTicking',
    R.always(false))
)

const startTick = R.when(
  isStart,
  mergeState('timeFrom',
    R.path(['action', 'time']))
)

const tick = R.when(
  isTick,
  mergeState('timeTo',
    R.path(['action', 'time']))
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(lap)
    .map(reset)
    .map(resetLaps)
    .map(start)
    .map(startTick)
    .map(tick)
    .map(stop)
    .map(R.prop('state'))
)

export const getReducer = () => {
  let reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  }
}

export default createStore(
  StoreNames.STOPWATCH, getReducer
)
