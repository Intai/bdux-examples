import * as R from 'ramda'

const PREFIX = 'AC'

const mapToKeyValue = (obj, key) => {
  obj[key] = PREFIX + '_' + key
  return obj
}

export default {

  createProp: (defaultValue) => {
    let current = defaultValue
    return (next) => (
      (typeof next !== 'undefined')
        ? (current = next)
        : current
    )
  },

  // map an array of strings to
  // object keys and prefixed values.
  createObjOfConsts: R.reduce(
    mapToKeyValue, {}
  )
}
