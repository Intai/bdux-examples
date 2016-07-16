import React from 'react'
import Container from './container-react'
import Header from './header-react'
import TimerLap from './timer-lap-react'
import Timer from './timer-react'
import Controls from './controls-react'
import Laps from './laps-react'
import styles from './app-style'
import { createComponent } from 'bdux'

export const App = () => (
  <Container style={ styles.wrap }>
    <Header>Stopwatch</Header>
    <TimerLap />
    <Timer />
    <Controls />
    <Laps />
  </Container>
)

export default createComponent(App)
