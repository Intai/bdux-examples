import React from 'react'
import { createComponent } from 'bdux'

export const Label = ({ children, ...props }) => (
  <span {...props}>
    {children}
  </span>
)

export default createComponent(Label)
