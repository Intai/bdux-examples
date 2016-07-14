import R from 'ramda'
import React from 'react'
import Common from '../utils/common-util'
import Container from './container-react'
import Label from './label-react'
import StopwatchStore from '../stores/stopwatch-store'
import styles from './timer-style'
import { createComponent } from 'bdux'

const hasTimeInterval = R.allPass([
  R.is(Object),
  R.propIs(Number, 'timeTo'),
  R.propIs(Number, 'timeFrom')
])

const calcTimeInterval = R.converge(
  R.subtract, [
    R.prop('timeTo'),
    R.prop('timeFrom')
  ]
)

const formatTimeInterval = R.pipe(
  calcTimeInterval,
  Common.formatTimeInterval
)

const renderTimeInterval = R.ifElse(
  // if has a valid time interval.
  hasTimeInterval,
  // format the time interval.
  formatTimeInterval,
  // otherwise, render zeros.
  R.always('00:00.00')
)

export const Timer = ({ stopwatch }) => (
  <Container style={ styles.wrap }>
    <Label style={ styles.time }>
      { renderTimeInterval(stopwatch) }
    </Label>
  </Container>
)

export default createComponent(Timer, {
  stopwatch: StopwatchStore
})
