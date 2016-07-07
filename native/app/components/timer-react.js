import React from 'react'
import Container from './container-react'
import Label from './label-react'
import { createComponent } from 'bdux'
import styles from './timer-style'

export const Timer = () => (
  <Container style={ styles.wrap }>
    <Label style={ styles.time }>
      00:00.00
    </Label>
  </Container>
)

export default createComponent(Timer)
