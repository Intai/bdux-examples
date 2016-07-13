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

const mergeDisabledStyle = R.ifElse(
  R.nthArg(1),
  R.merge(styles.disabled),
  R.identity
)

export const Button = ({ onClick, disabled, style, children }) => (
  <TouchableOpacity onPress={ onClick } disabled={ disabled }>
    <View style={ mergeDisabledStyle(styles.wrap, disabled) }>
      <Text style={[ mergeTextStyle(style) ]}>
        { children }
      </Text>
    </View>
  </TouchableOpacity>
)

export default createComponent(Button)
