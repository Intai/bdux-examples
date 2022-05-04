import * as R from 'ramda'
import * as Bacon from 'baconjs'
import fetch from 'isomorphic-fetch'
import ActionTypes from './action-types'
import countryList from '../data/country-list.json'

const DEFAULT_COUNTRY = 'NZ'
const URI_COUNTRIES = 'https://datahub.io/core/country-list/r/data.json'

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
)

const createCodesStream = () => (
  Bacon.fromPromise(
    fetch(URI_COUNTRIES, {
      method: 'GET',
      timeout: 3000
    })
  )
  .flatMap(createJsonStream)
  .mapError(R.always(countryList))
)

const createLoad = (codes) => ({
  type: ActionTypes.COUNTRY_CODES_LOAD,
  codes: codes
})

export const load = () => (
  createCodesStream()
    .map(createLoad)
)

export const select = (code) => ({
  type: ActionTypes.COUNTRY_CODES_SELECT,
  code: code
})

const shouldInitCodes = R.pipe(
  R.path(['country', 'codes']),
  R.either(R.isNil, R.isEmpty)
)

const shouldInitCountry = R.complement(
  R.pathEq(['country', 'selected'], DEFAULT_COUNTRY)
)

const selectDefault = R.partial(
  select, [DEFAULT_COUNTRY]
)

const initCodes = R.ifElse(
  shouldInitCodes,
  // fetch country codes from internet.
  load,
  R.F
)

const initCountry = R.ifElse(
  shouldInitCountry,
  R.pipe(
    // select new zealand by default.
    selectDefault,
    Bacon.once
  ),
  R.F
)

export const init = (...args) => {
  const streams = []
  const codes = initCodes(...args)
  const country = initCountry(...args)

  if (codes) {
    streams.push(codes)
  }
  if (country) {
    streams.push(country)
  }
  if (streams.length > 0) {
    return Bacon.mergeAll(streams)
  }
}
