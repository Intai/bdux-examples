import React from 'react'
import { Link } from 'bdux-react-router'
import { createComponent } from 'bdux'

const Menu = () => (
  <div>
    <Link to="/blog">Blog</Link>
    <Link to="/about">About</Link>
  </div>
)

export default createComponent(Menu)
