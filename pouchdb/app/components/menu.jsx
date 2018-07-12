import React from 'react'
import { Link } from 'bdux-react-router'
import { createComponent } from 'bdux'

const Menu = () => (
  <React.Fragment>
    <Link to="/blog">
      {'Blog'}
    </Link>
    <Link to="/about">
      {'About'}
    </Link>
  </React.Fragment>
)

export default createComponent(Menu)
