import * as R from 'ramda'
import React, { useMemo } from 'react'
import Movies from './movies'
import * as DiscoverAction from '../actions/discover-action'
import * as MovieAction from '../actions/movie-action'
import ConfigStore from '../stores/config-store'
import { createUseBdux } from 'bdux'

const update = ({ itemsTop, itemsRangeFrom, itemsRangeCount, ...args }) => (
  DiscoverAction.update(R.mergeRight(
    args, {
      top: itemsTop,
      from: itemsRangeFrom,
      count: itemsRangeCount
    }
  ))
)

const useBdux = createUseBdux({
  config: ConfigStore,
}, [
  // load image base url and sizes.
  MovieAction.config,
])

export const Discover = (props) => {
  const { bindToDispatch } = useBdux(props)
  const handleUpdate = useMemo(() => bindToDispatch(update), [bindToDispatch])
  return <Movies onUpdate={handleUpdate} />
}

export default Discover
