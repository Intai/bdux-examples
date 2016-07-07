import React from 'react'
import { createComponent } from 'bdux'

export const Label = ({ children }) => (
  <span>{ children }</span>
)

export default createComponent(Label)
