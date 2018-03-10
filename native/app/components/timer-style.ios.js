import * as R from 'ramda'
import styles from './timer-style.android'

export default R.mergeWith(R.merge, styles, {
  wrap: {
    marginTop: -15
  }
})
