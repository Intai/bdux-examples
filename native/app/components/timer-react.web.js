import React from 'react'
import classNames from 'classnames/bind'
import styles from './timer-style.web.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

export const Timer = () => (
  <span className={ cssModule({
      'time': true }) }>
    00:00.00
  </span>
)

export default createComponent(Timer)
