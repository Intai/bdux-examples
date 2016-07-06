import React from 'react'
import Button from './button-react'
import Container from './container-react'
import { createComponent } from 'bdux'

export const Controls = () => (
  <Container>
    <Button />
  </Container>
)

export default createComponent(Controls)
