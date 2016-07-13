import vars from './_variables.json'

export default {
  wrap: {
    backgroundColor: vars.color.offwhite,
    flexDirection: 'row',
    justifyContent:'center',
    paddingTop: 15,
    paddingRight: 5,
    paddingBottom: 15,
    paddingLeft: 5
  },
  start: {
    color: vars.color.success
  },
  stop: {
    color: vars.color.alert
  }
}
