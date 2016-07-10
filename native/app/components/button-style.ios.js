import vars from './_variables.json'

export default {
  wrap: {
    backgroundColor: vars.colour.white,
    borderRadius: vars.ios.fontMedium * 2,
    marginLeft: 5,
    marginRight: 5,
    width: vars.ios.fontMedium * 4,
    height: vars.ios.fontMedium * 4,
    overflow: 'hidden'
  },
  text: {
    fontFamily: vars.ios.sans,
    fontSize: vars.ios.fontMedium,
    lineHeight: vars.ios.fontMedium,
    marginTop: vars.ios.fontMedium * 1.5,
    textAlign: 'center'
  }
}
