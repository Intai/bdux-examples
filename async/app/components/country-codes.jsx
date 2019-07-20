import * as R from 'ramda'
import React from 'react'
import CountryCodesStore from '../stores/country-codes-store'
import * as CountryCodesAction from '../actions/country-codes-action'
import * as WeatherAction from '../actions/weather-action'
import classNames from 'classnames/bind'
import styles from './country-codes.scss'
import { createUseBdux } from 'bdux'

const cssModule = classNames.bind(styles)

const isNotEmpty = R.both(
  R.is(Object),
  R.pipe(
    R.prop('codes'),
    R.either(R.isNil, R.isEmpty),
    R.not
  )
)

const handleChange = (dispatch) => (event) => {
  dispatch(CountryCodesAction.select(event.target.value))
  dispatch(WeatherAction.clear())
}

const renderOption = (code) => (
  <option
    key={code.Code}
    value={code.Code}
  >
    {code.Name}
  </option>
)

const renderOptions = (codes) => (
  R.map(renderOption, codes || [])
)

const getWrapClass = (country) => (
  cssModule({
    'wrap': true,
    'empty': !country.selected
  })
)

const renderCountryCodes = (country, dispatch) => (
  <div className={getWrapClass(country)}>
    <label className={styles.label}>
      {'Country'}
    </label>
    <select
      className={styles.select}
      onChange={handleChange(dispatch)}
      value={country.selected}
    >
      {renderOptions(country.codes)}
    </select>
  </div>
)

const useBdux = createUseBdux({
  country: CountryCodesStore
},
// initialise country codes,
// select new zealand by default.
CountryCodesAction.init)

export const CountryCodes = (props) => {
  const { state, dispatch } = useBdux(props)
  return (
    renderCountryCodes(
      isNotEmpty(state.country) ? state.country : {},
      dispatch
    )
  )
}

export default CountryCodes
