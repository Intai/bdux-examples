import React from 'react'
import { createComponent } from 'bdux'

export const Header = ({ children }) => (
  <span>{ children }</span>
)

export default createComponent(Header)
