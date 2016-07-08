import React from 'react'
import Button from './button-react'
import Container from './container-react'
import { createComponent } from 'bdux'
import styles form './controls-style'

export const Controls = () => (
  <Container>
    <Button>Lap</Button>
    <Button>Reset</Button>
    <Button style={ styles.start }>Start</Button>
    <Button style={ styles.stop }>Stop</Button>
  </Container>
)

export default createComponent(Controls)
