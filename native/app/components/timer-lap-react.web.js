import React from 'react'
import classNames from 'classnames/bind'
import styles from './timer-lap-style.web.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

export const TimerLap = () => (
  <span className={ cssModule({
      'time': true }) }>
    00:00.00
  </span>
)

export default createComponent(TimerLap)
