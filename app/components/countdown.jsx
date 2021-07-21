import { is } from 'ramda'
import React from 'react'
import * as CountDownAction from '../actions/countdown-action'
import CountDownStore from '../stores/countdown-store'
import styles from './countdown.scss'
import { createUseBdux } from 'bdux'

const twoDigits = (number) => (
  // add a leading zero.
  ('0' + number).slice(-2)
)

const format = (seconds) => (
  // format to mm:ss.
  twoDigits(Math.floor(seconds / 60)) + ':'
    + twoDigits(seconds % 60)
)

const useBdux = createUseBdux({
  countdown: CountDownStore,
}, [
  // start counting down.
  CountDownAction.countdown,
])

const CountDown = (props) => {
  const { state } = useBdux(props)
  const { countdown } = state

  return is(Number, countdown) && (
    <span className={styles.time}>
      {format(countdown)}
    </span>
  )
}

export default CountDown
