import React from 'react'
import Movies from './movies'
import { createComponent } from 'bdux'

const onScroll = () => {}

export const Discover = () => (
  <Movies onScroll={onScroll} />
)

export default createComponent(Discover)
