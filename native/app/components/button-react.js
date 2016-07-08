import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createComponent } from 'bdux'

export const Button = ({ children }) => (
  <TouchableOpacity>
    <Text>{ children }</Text>
  </TouchableOpacity>
)

export default createComponent(Button)
