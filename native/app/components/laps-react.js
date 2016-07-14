import React from 'react'
import { ListView } from 'react-native'
import StopwatchStore from '../stores/stopwatch-store'
import styles from './laps-style'
import { createComponent } from 'bdux'

export const Laps = () => (
  <ListView style={ styles.wrap } />
)

export default createComponent(Laps, {
  stopwatch: StopwatchStore
})
