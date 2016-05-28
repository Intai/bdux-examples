import React from 'react'
import Container from './container-react'
import Header from './header-react'
import { createComponent } from 'bdux'

export const App = () => (
  <Container>
    <Header>Stopwatch</Header>
  </Container>
)

export default createComponent(App)
