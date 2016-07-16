import vars from './_variables.json'
import { Platform } from 'react-native'

export default {
  wrap: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 0,
    marginTop: -20
  },
  time: {
    color: vars.color.grey,
    fontSize: vars.native.fontHuge,
    fontFamily: vars[Platform.OS].sansserif,
    textAlign: 'center'
  }
}
