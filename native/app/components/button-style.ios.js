import vars from './_variables.json'

export default {
  wrap: {
    backgroundColor: vars.color.white,
    borderRadius: vars.ios.fontMedium * 2,
    marginLeft: 10,
    marginRight: 10,
    width: vars.ios.fontMedium * 4,
    height: vars.ios.fontMedium * 4,
    overflow: 'hidden'
  },
  text: {
    color: vars.color.grey,
    fontFamily: vars.ios.sans,
    fontSize: vars.ios.fontMedium,
    lineHeight: vars.ios.fontMedium,
    marginTop: vars.ios.fontMedium * 1.5,
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: vars.color.offwhite,
    opacity: 0.4
  }
}
