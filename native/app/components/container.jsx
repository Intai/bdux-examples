import React from 'react'
import { View } from 'react-native'
import { createComponent } from 'bdux'

export const Container = ({ children, ...props }) => (
  <View {...props}>
    {children}
  </View>
)

export default createComponent(Container)
