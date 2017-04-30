import R from 'ramda'
import React from 'react'
import Movies from './movies'
import DiscoverAction from '../actions/discover-action'
import MovieAction from '../actions/movie-action'
import { createComponent } from 'bdux'

const onUpdate = ({ itemsTop, itemsRangeFrom, itemsRangeCount, ...args }) => {
  DiscoverAction.update(R.merge(
    args, {
      top: itemsTop,
      from: itemsRangeFrom,
      count: itemsRangeCount
    }
  ))
}

export const Discover = () => (
  <Movies onUpdate={onUpdate} />
)

export default createComponent(Discover, {},
  // load image base url and sizes.
  MovieAction.config
)
