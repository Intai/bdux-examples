import vars from './_variables.json'

export default {
  wrap: {
    backgroundColor: vars.color.offwhite,
    paddingRight: 10,
    paddingLeft: 10
  },
  separator: {
    borderColor: vars.color.white,
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  item: {
    flexDirection: 'row',
    padding: 10
  },
  index: {
    textAlign: 'center',
    fontSize: vars.android.fontMedium,
    color: vars.color.grey,
    opacity: 0.6,
    flex: 1
  },
  interval: {
    textAlign: 'center',
    fontSize: vars.android.fontMedium,
    color: vars.color.grey,
    flex: 1
  }
}
