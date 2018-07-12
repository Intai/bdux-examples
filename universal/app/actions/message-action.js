import ActionTypes from './action-types'

export const message = (message) => ({
  type: ActionTypes.MESSAGE,
  message: message
})
