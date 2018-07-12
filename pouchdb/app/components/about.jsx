import React from 'react'
import Menu from './menu'
import AboutStore from '../stores/about-store'
import { createComponent } from 'bdux'

const renderDescription = (about) => (
  !!about && about.description
)

export const About = ({ about }) => (
  <React.Fragment>
    <Menu />
    {renderDescription(about)}
  </React.Fragment>
)

export default createComponent(About, {
  about: AboutStore
})
