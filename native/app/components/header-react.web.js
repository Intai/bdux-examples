import React from 'react'
import classNames from 'classnames/bind'
import styles from './header-style.web.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

export const Header = ({ children }) => (
  <span className={ cssModule({
      'label': true }) }>
    { children }
  </span>
)

export default createComponent(Header)
