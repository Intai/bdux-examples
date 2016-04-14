import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

export const message = (message) => ({
  type: ActionTypes.MESSAGE,
  message: message
});

export default bindToDispatch({
  message
});
