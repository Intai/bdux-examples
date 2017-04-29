import R from 'ramda'
import React from 'react'
import Movies from './movies'
import DiscoverAction from '../actions/discover-action'
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

export default createComponent(Discover)
