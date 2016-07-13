import R from 'ramda'
import React from 'react'
import StopwatchStore from '../stores/stopwatch-store';
import StopwatchAction from '../actions/stopwatch-action';
import Button from './button-react'
import Container from './container-react'
import styles from './controls-style'
import { createComponent } from 'bdux'

const renderStartButton = () => (
  <Button
    style={ styles.start }
    onClick={ StopwatchAction.start }>
    Start
  </Button>
)

const renderStopButton = () => (
  <Button
    style={ styles.stop }
    onClick={ StopwatchAction.stop }>
    Stop
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
    disabled={ isCleared(stopwatch) }
    onClick={ StopwatchAction.lap }>
    Lap
  </Button>
)

const renderResetButton = () => (
  <Button
    onClick={ StopwatchAction.reset }>
    Reset
  </Button>
)

const renderLapReset = R.ifElse(
  R.anyPass([isTicking, isCleared]),
  renderLapButton,
  renderResetButton
)

export const Controls = ({ stopwatch }) => (
  <Container style={ styles.wrap }>
    { renderLapReset(stopwatch) }
    { renderStartStop(stopwatch) }
  </Container>
)

export default createComponent(Controls, {
  stopwatch: StopwatchStore
})
