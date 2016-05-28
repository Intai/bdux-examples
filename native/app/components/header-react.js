import React from 'react'
import { Text } from 'react-native'
import { createComponent } from 'bdux'

export const Header = ({ children }) => (
  <Text>{ children }</Text>
)

export default createComponent(Header)
