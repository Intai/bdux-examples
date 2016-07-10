import React from 'react'
import Button from './button-react'
import Container from './container-react'
import styles from './controls-style'
import { createComponent } from 'bdux'

export const Controls = () => (
  <Container style={ styles.wrap }>
    <Button>Lap</Button>
    <Button>Reset</Button>
    <Button style={ styles.start }>Start</Button>
    <Button style={ styles.stop }>Stop</Button>
  </Container>
)

export default createComponent(Controls)
