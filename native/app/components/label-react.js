import React from 'react'
import { Text } from 'react-native'
import { createComponent } from 'bdux'

export const Label = ({ children }) => (
  <Text>{ children }</Text>
)

export default createComponent(Label)
