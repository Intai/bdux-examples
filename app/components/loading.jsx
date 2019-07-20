import React from 'react'
import LoadingStore from '../stores/loading-store'
import classNames from 'classnames/bind'
import styles from './loading.scss'
import { createUseBdux } from 'bdux'

const cssModule = classNames.bind(styles)

const getSpinnerClass = (loading) => (
  cssModule({
    loading,
    spinner: true,
    'fa-spinner fa-spin': true
  })
)

const useBdux = createUseBdux({
  loading: LoadingStore
})

export const Loading = (props) => {
  const { state } = useBdux(props)
  return (
    <div className={styles.wrap}>
      <div className={getSpinnerClass(state.loading)} />
    </div>
  )
}

export default Loading
