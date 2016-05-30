import React from 'react'
import { View, Text } from 'react-native'
import { createComponent } from 'bdux'
import styles from './generated/timer-lap-style'

export const Timerlap = () => (
  <View style={ styles.wrap }>
    <Text style={ styles.time }>
      00:00.00
    </Text>
  </View>
)

export default createComponent(Timerlap)
