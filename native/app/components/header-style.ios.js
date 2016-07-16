import R from 'ramda'
import styles from './header-style.android'

export default R.mergeWith(R.merge, styles, {
  wrap: {
    paddingTop: 30
  }
})
