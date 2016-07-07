import React from 'react'
import { createComponent } from 'bdux'

export const Container = ({ children, ...props }) => (
  <div { ...props }>{ children }</div>
)

export default createComponent(Container)
