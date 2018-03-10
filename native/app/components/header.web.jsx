import React from 'react'
import styles from './header-style.web.scss'
import { createComponent } from 'bdux'

export const Header = ({ children }) => (
  <span className={styles.label}>
    {children}
  </span>
)

export default createComponent(Header)
