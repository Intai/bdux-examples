import React from 'react'
import styles from './button-style.web.scss'
import { createComponent } from 'bdux'

export const Button = ({ children, ...props }) => (
  <button
    type="button"
    {...props}
    className={styles.button}
  >
    {children}
  </button>
)

export default createComponent(Button)
