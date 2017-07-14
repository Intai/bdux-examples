import Bacon from 'baconjs'
import StoreNames from './store-names'
import { createStore } from 'bdux'

export const getReducer = () => {
  const reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: reducerStream
  }
}

export default createStore(
  StoreNames.BLOG, getReducer
)
