import React from 'react'
import Container from './container-react'
import { createComponent } from 'bdux'

export const Button = ({ children }) => (
  <button>{ children }</button>
)

export default createComponent(Button)
