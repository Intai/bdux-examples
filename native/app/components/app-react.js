import React from 'react'
import Container from './container-react'
import Header from './header-react'
import TimerLap from './timer-lap-react'
import Timer from './timer-react'
import Controls from './controls-react'
import Laps from './laps-react'
import styles from './app-style'
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

export const App = () => (
  <Container style={ styles.wrap }>
    <Header>Stopwatch</Header>
    <TimerLap />
    <Timer />
    <Controls />
    <Laps />
    <TimeTravel />
  </Container>
)

export default createComponent(App)
