import React from 'react'
import { createComponent } from 'bdux'

export const Container = ({ children }) => (
  <div>{ children }</div>
)

export default createComponent(Container)
