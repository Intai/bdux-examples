import * as R from 'ramda'
import React from 'react'
import * as CountDownAction from '../actions/countdown-action'
import CountDownStore from '../stores/countdown-store'
import styles from './countdown.scss'
import { createComponent } from 'bdux'

const twoDigits = (number) => (
  // add a leading zero.
  ('0' + number).slice(-2)
)

const format = (seconds) => (
  // format to mm:ss.
  twoDigits(Math.floor(seconds / 60)) + ':'
    + twoDigits(seconds % 60)
)

const renderCountDown = ({ countdown }) => (
  <span className={styles.time}>
    {format(countdown)}
  </span>
)

export const CountDown = R.ifElse(
  // if it's a number.
  R.propIs(Number, 'countdown'),
  // render the countdown.
  renderCountDown,
  // otherwise, render nothing.
  R.F
)

export default createComponent(CountDown, {
  countdown: CountDownStore
},
// start counting down.
CountDownAction.countdown)
