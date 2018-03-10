import React from 'react'
import Container from './container'
import Header from './header'
import TimerLap from './timer-lap'
import Timer from './timer'
import Controls from './controls'
import Laps from './laps'
import styles from './app-style'
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

export const App = () => (
  <Container style={styles.wrap}>
    <Header>
      {'Stopwatch'}
    </Header>
    <TimerLap />
    <Timer />
    <Controls />
    <Laps />
    <TimeTravel />
  </Container>
)

export default createComponent(App)
