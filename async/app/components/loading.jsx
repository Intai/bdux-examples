import React from 'react'
import LoadingStore from '../stores/loading-store'
import classNames from 'classnames/bind'
import styles from './loading.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles)

const getSpinnerClass = ({ loading }) => (
  cssModule({
    loading,
    spinner: true,
    'fa-spinner fa-spin': true
  })
)

export const Loading = (props) => (
  <div className={styles.wrap}>
    <div className={getSpinnerClass(props)} />
  </div>
)

export default createComponent(Loading, {
  loading: LoadingStore
})
