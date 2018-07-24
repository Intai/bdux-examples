import * as R from 'ramda'
import ActionTypes from './action-types'

export const update = R.pipe(
  R.pick(['scrollId', 'scrollTop', 'top', 'from', 'count']),
  R.assoc('type', ActionTypes.DISCOVER_UPDATE)
)
