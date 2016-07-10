import React from 'react'
import classNames from 'classnames/bind'
import styles from './button-style.web.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

export const Button = ({ children, ...props }) => (
  <button { ...props }
    className={ cssModule({
      'button': true }) }>
    { children }
  </button>
)

export default createComponent(Button)
