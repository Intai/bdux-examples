import React from 'react'
import { Text } from 'react-native'
import { createComponent } from 'bdux'

export const Label = ({ children, ...props }) => (
  <Text {...props}>
    {children}
  </Text>
)

export default createComponent(Label)
