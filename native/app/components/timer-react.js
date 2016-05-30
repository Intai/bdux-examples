import React from 'react'
import { View, Text } from 'react-native'
import { createComponent } from 'bdux'
import styles from './generated/timer-style'

export const Timer = () => (
  <View style={ styles.wrap }>
    <Text style={ styles.time }>
      00:00.00
    </Text>
  </View>
)

export default createComponent(Timer)
