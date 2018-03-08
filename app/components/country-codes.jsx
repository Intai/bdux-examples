import * as R from 'ramda'
import React from 'react'
import CountryCodesStore from '../stores/country-codes-store'
import CountryCodesAction from '../actions/country-codes-action'
import WeatherAction from '../actions/weather-action'
import classNames from 'classnames/bind'
import styles from './country-codes.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles)

const isNotEmpty = R.both(
  R.is(Object),
  R.pipe(
    R.prop('codes'),
    R.either(R.isNil, R.isEmpty),
    R.not
  )
)

const onChange = (event) => {
  CountryCodesAction.select(event.target.value)
  WeatherAction.clear()
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

const renderCountryCodes = (country) => (
  <div className={getWrapClass(country)}>
    <label className={styles.label}>
      {'Country'}
    </label>
    <select
      className={styles.select}
      onChange={onChange}
      value={country.selected}
    >
      {renderOptions(country.codes)}
    </select>
  </div>
)

export const CountryCodes = ({ country }) => (
  renderCountryCodes(
    isNotEmpty(country) ? country : {}
  )
)

export default createComponent(CountryCodes, {
  country: CountryCodesStore
},
// initialise country codes,
// select new zealand by default.
CountryCodesAction.init)
