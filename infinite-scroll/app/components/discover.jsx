import * as R from 'ramda'
import React from 'react'
import Movies from './movies'
import * as DiscoverAction from '../actions/discover-action'
import * as MovieAction from '../actions/movie-action'
import ConfigStore from '../stores/config-store'
import { createComponent } from 'bdux'

const handleUpdate = (dispatch) => ({ itemsTop, itemsRangeFrom, itemsRangeCount, ...args }) => {
  dispatch(
    DiscoverAction.update(R.merge(
      args, {
        top: itemsTop,
        from: itemsRangeFrom,
        count: itemsRangeCount
      }
    ))
  )
}

export const Discover = ({ dispatch }) => (
  <Movies onUpdate={handleUpdate(dispatch)} />
)

export default createComponent(Discover, {
  config: ConfigStore,
},
// load image base url and sizes.
MovieAction.config)
