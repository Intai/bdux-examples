import * as R from 'ramda'
import React from 'react'
import Common from '../utils/common-util'
import StopwatchStore from '../stores/stopwatch-store'
import styles from './laps-style.web.scss'
import { createComponent } from 'bdux'

const hasLaps = R.allPass([
  R.is(Object),
  R.propIs(Array, 'laps')]
)

const accumLapInterval = (timeFrom, timeTo) => (
  [timeTo, timeTo - timeFrom]
)

const accumLapIntervals = R.pipe(
  R.converge(
    R.mapAccum(accumLapInterval), [
      R.prop('timeFrom'),
      R.prop('laps')
    ]
  ),
  R.nth(1),
  R.reverse
)

const renderLap = R.curry((length, interval, index) => (
  <li
    className={styles.item}
    key={index}
  >
    <span className={styles.index}>
      {`Lap ${length - index}`}
    </span>
    <span className={styles.interval}>
      {Common.formatTimeInterval(interval)}
    </span>
  </li>
))

const renderLapsArray = R.pipe(
  accumLapIntervals,
  R.converge(
    R.addIndex(R.map), [
      R.pipe(R.length, renderLap),
      R.identity
    ]
  )
)

const renderLaps = R.ifElse(
  hasLaps,
  renderLapsArray,
  R.F
)

export const Laps = ({ stopwatch }) => (
  <ul className={styles.wrap}>
    {renderLaps(stopwatch)}
  </ul>
)

export default createComponent(Laps, {
  stopwatch: StopwatchStore
})
