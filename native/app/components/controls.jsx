import * as R from 'ramda'
import React from 'react'
import StopwatchStore from '../stores/stopwatch-store';
import StopwatchAction from '../actions/stopwatch-action';
import Button from './button'
import Container from './container'
import styles from './controls-style'
import { createComponent } from 'bdux'

const renderStartButton = () => (
  <Button
    onClick={StopwatchAction.start}
    style={styles.start}
  >
    {'Start'}
  </Button>
)

const renderStopButton = () => (
  <Button
    onClick={StopwatchAction.stop}
    style={styles.stop}
  >
    {'Stop'}
  </Button>
)

const isTicking = R.pipe(
  R.defaultTo({}),
  R.prop('isTicking')
)

const renderStartStop = R.ifElse(
  isTicking,
  renderStopButton,
  renderStartButton
)

const isCleared = R.pipe(
  R.defaultTo({}),
  R.converge(R.equals, [
    R.prop('timeFrom'),
    R.prop('timeTo')
  ])
)

const renderLapButton = (stopwatch) => (
  <Button
    disabled={isCleared(stopwatch)}
    onClick={StopwatchAction.lap}
  >
    {'Lap'}
  </Button>
)

const renderResetButton = () => (
  <Button onClick={StopwatchAction.reset}>
    {'Reset'}
  </Button>
)

const renderLapReset = R.ifElse(
  R.either(isTicking, isCleared),
  renderLapButton,
  renderResetButton
)

export const Controls = ({ stopwatch }) => (
  <Container style={styles.wrap}>
    {renderLapReset(stopwatch)}
    {renderStartStop(stopwatch)}
  </Container>
)

export default createComponent(Controls, {
  stopwatch: StopwatchStore
})
