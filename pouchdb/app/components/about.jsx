import React from 'react'
import Menu from './menu'
import AboutStore from '../stores/about-store'
import { createComponent } from 'bdux'

export const About = ({ about }) => (
  <div>
    <Menu />
    {about}
  </div>
)

export default createComponent(About, {
  about: AboutStore
})
