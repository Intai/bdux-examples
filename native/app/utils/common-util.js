import * as R from 'ramda'

const PREFIX = 'NTV'

const mapToKeyValue = (obj, key) => {
  obj[key] = PREFIX + '_' + key
  return obj
}

const padTwoZeros = (num) => (
  ('00' + num).slice(-2)
)

export default {

  now: Date.now || (() => (
    (new Date()).getTime()
  )),

  formatTimeInterval: (ms) => (
    padTwoZeros(Math.floor(ms / 60000)) + ':' +
    padTwoZeros(Math.floor((ms % 60000) / 1000)) + '.' +
    padTwoZeros(Math.round((ms % 1000) / 10))
  ),

  // map an array of strings to
  // object keys and prefixed values.
  createObjOfConsts: R.reduce(
    mapToKeyValue, {}
  )
}
