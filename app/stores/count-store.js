import R from 'ramda'
import Bacon from 'baconjs'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(R.prop('state'))
)

export const getReducer = () => {
  let reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  }
}

export default createStore(
  StoreNames.COUNT, getReducer
)
