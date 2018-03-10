import React from 'react'
import { View, StatusBar, Text } from 'react-native'
import { createComponent } from 'bdux'
import styles from './header-style'

export const Header = ({ children }) => (
  <View style={styles.wrap}>
    <StatusBar
      backgroundColor="#444"
      barStyle="default"
    />
    <Text style={styles.label}>
      {children}
    </Text>
  </View>
)

export default createComponent(Header)
