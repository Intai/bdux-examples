import * as R from 'ramda'

const PREFIX = 'MV'

const mapToKeyValue = (obj, key) => {
  obj[key] = PREFIX + '_' + key
  return obj
}

export default {

  now: Date.now || (() => (
    (new Date()).getTime()
  )),

  mergeState: (name, func) => R.converge(
    R.mergeWith(R.mergeRight), [
      R.identity,
      R.pipe(
        func,
        R.objOf(name),
        R.objOf('state')
      )
    ]
  ),

  // map an array of strings to
  // object keys and prefixed values.
  createObjOfConsts: R.reduce(
    mapToKeyValue, {}
  )
}
