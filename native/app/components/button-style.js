import vars from './_variables.json'
import { Platform } from 'react-native'

export default {
  wrap: {
    backgroundColor: vars.color.white,
    borderRadius: vars.native.fontMedium * 2,
    width: vars.native.fontMedium * 4,
    height: vars.native.fontMedium * 4,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: vars.color.grey,
    fontFamily: vars[Platform.OS].sans,
    fontSize: vars.native.fontMedium
  },
  disabled: {
    backgroundColor: vars.color.offwhite,
    opacity: 0.4
  }
}
