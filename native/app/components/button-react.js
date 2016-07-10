import R from 'ramda'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from './button-style'
import { createComponent } from 'bdux'

const mergeTextStyle = R.pipe(
  R.defaultTo({}),
  R.pick(['color']),
  R.merge(styles.text)
)

export const Button = ({ onClick, style, children }) => (
  <TouchableOpacity onPress={ onClick }>
    <View style={ styles.wrap }>
      <Text style={ mergeTextStyle(style) }>
        { children }
      </Text>
    </View>
  </TouchableOpacity>
)

export default createComponent(Button)
