import React from 'react'
import Container from './container-react'
import Header from './header-react'
import TimerLap from './timer-lap-react'
import Timer from './timer-react'
import { createComponent } from 'bdux'

export const App = () => (
  <Container>
    <Header>Stopwatch</Header>
    <TimerLap />
    <Timer />
  </Container>
)

export default createComponent(App)
