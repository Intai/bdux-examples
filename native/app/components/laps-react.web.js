import R from 'ramda'
import React from 'react'
import Common from '../utils/common-util'
import StopwatchStore from '../stores/stopwatch-store'
import classNames from 'classnames/bind'
import styles from './laps-style.web.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const hasLaps = R.allPass([
  R.is(Object),
  R.propIs(Array, 'laps')]
)

const accumLapInterval = (timeFrom, timeTo) => (
  [timeTo, timeTo - timeFrom]
)

const accumLapIntervals = R.converge(
  R.mapAccum(accumLapInterval), [
    R.prop('timeFrom'),
    R.prop('laps')
  ]
)

const renderLap = (interval) => (
  <li>
    { Common.formatTimeInterval(interval) }
  </li>
)

const renderLapsArray = R.pipe(
  accumLapIntervals,
  R.nth(1),
  R.map(renderLap)
)

const renderLaps = R.ifElse(
  hasLaps,
  renderLapsArray,
  R.always(<noscript />)
)

export const Laps = ({ stopwatch }) => (
  <ul className={ cssModule({
    'wrap': true }) }>
    { renderLaps(stopwatch) }
  </ul>
)

export default createComponent(Laps, {
  stopwatch: StopwatchStore
})
