import vars from './_variables.json'

export default {
  wrap: {
    borderWidth: 1,
    borderColor: vars.colour.grey,
    borderRadius: vars.ios.fontMedium * 2,
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
