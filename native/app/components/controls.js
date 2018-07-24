import * as R from 'ramda'
import React from 'react'
import StopwatchStore from '../stores/stopwatch-store'
import * as StopwatchAction from '../actions/stopwatch-action'
import Button from './button'
import Container from './container'
import styles from './controls-style'
import { createComponent } from 'bdux'

const renderStartButton = ({ bindToDispatch }) => (
  <Button
    onClick={bindToDispatch(StopwatchAction.start)}
    style={styles.start}
  >
    {'Start'}
  </Button>
)

const renderStopButton = ({ bindToDispatch }) => (
  <Button
    onClick={bindToDispatch(StopwatchAction.stop)}
    style={styles.stop}
  >
    {'Stop'}
  </Button>
)

const isTicking = R.path(
  ['stopwatch', 'isTicking']
)

const renderStartStop = R.ifElse(
  isTicking,
  renderStopButton,
  renderStartButton
)

const isCleared = R.converge(
  R.equals, [
    R.path(['stopwatch', 'timeFrom']),
    R.path(['stopwatch', 'timeTo'])
  ]
)

const renderLapButton = ({ bindToDispatch, props }) => (
  <Button
    disabled={isCleared(props)}
    onClick={bindToDispatch(StopwatchAction.lap)}
  >
    {'Lap'}
  </Button>
)

const renderResetButton = ({ bindToDispatch }) => (
  <Button onClick={bindToDispatch(StopwatchAction.reset)}>
    {'Reset'}
  </Button>
)

const renderLapReset = R.ifElse(
  R.either(isTicking, isCleared),
  renderLapButton,
  renderResetButton
)

export const Controls = (props) => (
  <Container style={styles.wrap}>
    {renderLapReset(props)}
    {renderStartStop(props)}
  </Container>
)

export default createComponent(Controls, {
  stopwatch: StopwatchStore
})
