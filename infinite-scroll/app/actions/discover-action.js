import ActionTypes from './action-types'
import { bindToDispatch } from 'bdux'

export const update = ({ top, index, count }) => ({
  type: ActionTypes.DISCOVER_UPDATE,
  discover: {
    top,
    index,
    count
  }
})

export default bindToDispatch({
  update
})
