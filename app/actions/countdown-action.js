import * as R from 'ramda'
import * as Bacon from 'baconjs'
import Common from '../utils/common-util'
import ActionTypes from './action-types'

const TIME_COUNTDOWN = 60000
const TIME_TICK = 1000

const createCountdown = () => {
  const now = Common.now()
  return {
    type: ActionTypes.COUNTDOWN_START,
    from: now,
    current: now,
    to: now + TIME_COUNTDOWN
  }
}

const createTick = () => ({
  type: ActionTypes.COUNTDOWN_TICK,
  current: Common.now()
})

const createStop = () => ({
  type: ActionTypes.COUNTDOWN_STOP
})

const createTickForPoll = R.pipe(
  createTick,
  R.constructN(1, Bacon.Next)
)

const isTicking = R.converge(
  R.lte, [
    R.prop('current'),
    R.prop('to')
  ]
)

const whenOnEnd = (stream) => {
  let isEnd = true

  return () => {
    if (isEnd) {
      isEnd = false
      stream.onEnd(() => {
        isEnd = true
      })

      return stream
    }
  }
}

export const countdown = whenOnEnd(
  Bacon.mergeAll(
    // start the countdown.
    Bacon.once(createCountdown()),
    // ticking.
    Bacon.fromPoll(TIME_TICK, createTickForPoll)
  )
  .scan(null, R.mergeRight)
  .filter(R.identity)
  // determine when to end.
  .takeWhile(isTicking)
  // stop the countdown.
  .mapEnd(createStop)
)
