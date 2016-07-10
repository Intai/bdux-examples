import vars from './_variables.json'

export default {
  wrap: {
    borderWidth: 1,
    borderColor: vars.colour.grey,
    borderRadius: vars.android.fontMedium * 2,
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
