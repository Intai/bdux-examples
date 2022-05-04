import * as R from 'ramda'
import * as Bacon from 'baconjs'
import ActionTypes from '../actions/action-types'
import StoreNames from './store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const isLoad =  isAction(
  ActionTypes.COUNTRY_CODES_LOAD
)

const isSelect =  isAction(
  ActionTypes.COUNTRY_CODES_SELECT
)

const mergeState = (name, func) => (
  R.converge(R.mergeWith(R.mergeRight), [
    R.identity,
    R.pipe(
      func,
      R.objOf(name),
      R.objOf('state')
    )
  ])
)

const loadCountryCodes = R.when(
  // if loading country codes.
  isLoad,
  // merge the codes into state.
  mergeState('codes',
    R.path(['action', 'codes']))
)

const selectCountryCode = R.when(
  // if selecting a country code.
  isSelect,
  // merge the selected code into state.
  mergeState('selected',
    R.path(['action', 'code']))
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(loadCountryCodes)
    .map(selectCountryCode)
    .map(R.prop('state'))
)

export const getReducer = () => {
  const reducerStream = new Bacon.Bus()

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  }
}

export default createStore(
  StoreNames.COUNTRY_CODES, getReducer
)
