import R from 'ramda'
import vars from './_variables.json'
import styles from './timer-style.android'

export default R.mergeWith(R.merge, styles, {
  wrap: {
    marginTop: -15
  }
})
