import vars from './_variables.json'
import { Platform } from 'react-native';

export default {
  wrap: {
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 176
  },
  time: {
    color: vars.color.offgrey,
    fontSize: vars.native.fontLarge,
    fontFamily: vars[Platform.OS].sansserif,
    textAlign: 'center'
  }
}
