import R from 'ramda'
import Bacon from 'baconjs'
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

const getTimeStopped = R.path(
  ['state', 'timeStopped']
)

const getTimeFrom = R.pipe(
  R.path(['state', 'timeFrom']),
  R.defaultTo(0)
)

const getTimeTo = R.pipe(
  R.path(['state', 'timeTo']),
  R.defaultTo(0)
)

const getLaps = R.pipe(
  R.path(['state', 'laps']),
  R.defaultTo([])
)

const recordLap = ({ state }) => (
  R.append(state.timeTo, state.laps || [])
)

const lap = R.when(
  isLap,
  mergeState('laps',
    recordLap)
)

const resetTimeTo = R.when(
  isReset,
  mergeState('timeTo',
    getTimeFrom)
)

const resetLaps = R.when(
  isReset,
  mergeState('laps',
    R.always([]))
)

const startTick = R.when(
  isStart,
  mergeState('isTicking',
    R.always(true))
)

const calcTimeStopped = R.converge(
  R.subtract, [
    R.path(['action', 'time']),
    getTimeTo
  ]
)

const updateTimeStopped = R.when(
  isStart,
  mergeState('timeStopped',
    calcTimeStopped)
)

const adjustTimeFrom = R.converge(
  R.add, [
    getTimeStopped,
    getTimeFrom
  ]
)

const updateTimeFrom = R.when(
  isStart,
  mergeState('timeFrom',
    adjustTimeFrom)
)

const adjustLap = (timeStopped, timeLap) => (
  [timeStopped, timeStopped + timeLap]
)

const adjustLaps = R.pipe(
  R.converge(
    R.mapAccum(adjustLap), [
      getTimeStopped,
      getLaps
    ]
  ), R.nth(1)
)

const updateLaps = R.when(
  isStart,
  mergeState('laps',
    adjustLaps)
)

const stopTick = R.when(
  isStop,
  mergeState('isTicking',
    R.always(false))
)

const updateTimeTo = R.when(
  R.anyPass([isStart, isTick, isStop]),
  mergeState('timeTo',
    R.path(['action', 'time']))
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(lap)
    .map(resetTimeTo)
    .map(resetLaps)
    .map(startTick)
    .map(updateTimeStopped)
    .map(updateTimeFrom)
    .map(updateTimeTo)
    .map(updateLaps)
    .map(stopTick)
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
