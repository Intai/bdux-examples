import vars from './_variables.json'

export default {
  wrap: {
    backgroundColor: vars.colour.offwhite,
    flexDirection: 'row',
    justifyContent:'center',
    paddingTop: 15,
    paddingRight: 5,
    paddingBottom: 15,
    paddingLeft: 5
  },
  start: {
    color: vars.colour.success
  },
  stop: {
    color: vars.colour.alert
  }
}
