import { reduce } from 'ramda'

const PREFIX = 'CD'

const mapToKeyValue = (obj, key) => {
  obj[key] = PREFIX + '_' + key
  return obj
}

export default {

  now: Date.now || (() => (
    (new Date()).getTime()
  )),

  // map an array of strings to
  // object keys and prefixed values.
  createObjOfConsts: reduce(
    mapToKeyValue, {}
  )
}
