import vars from './_variables.json'

export default {
  wrap: {
    backgroundColor: vars.colour.white,
    borderRadius: vars.android.fontMedium * 2,
    marginLeft: 5,
    marginRight: 5,
    width: vars.android.fontMedium * 4,
    height: vars.android.fontMedium * 4,
    overflow: 'hidden'
  },
  text: {
    fontFamily: vars.android.sans,
    fontSize: vars.android.fontMedium,
    lineHeight: vars.android.fontMedium + 5,
    marginTop: vars.android.fontMedium * 1.5 - 5,
    textAlign: 'center'
  }
}
