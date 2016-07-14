import R from 'ramda'
import Bacon from 'baconjs'
import Common from '../utils/common-util'
import ActionTypes from './action-types'
import { bindToDispatch } from 'bdux'

const TIME_TICK = 10

const stopStream = new Bacon.Bus()

const createStart = () => ({
  type: ActionTypes.STOPWATCH_START,
  time: Common.now()
})

const createStop = () => ({
  type: ActionTypes.STOPWATCH_STOP,
  time: Common.now()
})

const createTick = () => ({
  type: ActionTypes.STOPWATCH_TICK,
  time: Common.now()
})

const createTickForPoll = R.pipe(
  createTick,
  R.constructN(1, Bacon.Next)
)

const isStopEvent = R.pipe(
  R.invoker(0, 'value'),
  R.propEq('type', ActionTypes.STOPWATCH_STOP)
)

const handleTickEnd = function(event) {
  return isStopEvent(event)
    ? (this.push(event) && this.push(new Bacon.End()))
    : this.push(event)
}

export const lap = () => ({
  type: ActionTypes.STOPWATCH_LAP
})

export const reset = () => ({
  type: ActionTypes.STOPWATCH_RESET
})

export const start = () => (
  Bacon.mergeAll(
    // start the stopwatch.
    Bacon.once(createStart()),
    // ticking.
    Bacon.fromPoll(TIME_TICK, createTickForPoll),
    // stop.
    stopStream
  )
  // determine when to end.
  .withHandler(handleTickEnd)
)

export const stop = () => {
  stopStream.push(createStop())
}

export default bindToDispatch({
  lap,
  reset,
  start,
  stop
})
