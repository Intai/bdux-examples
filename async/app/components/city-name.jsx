import * as R from 'ramda'
import React from 'react'
import CountryCodesStore from '../stores/country-codes-store'
import WeatherStore from '../stores/weather-store'
import * as WeatherAction from '../actions/weather-action'
import styles from './city-name.scss'
import { createComponent } from 'bdux'

const handleChange = ({ dispatch }) => (event) => {
  dispatch(WeatherAction.setCity(event.target.value))
}

const handleFocus = ({ dispatch }) => () => {
  dispatch(WeatherAction.setFocus(false))
}

const handleBlur = ({ dispatch }) => () => {
  dispatch(WeatherAction.setFocus(true))
}

const hasCountryAndWeather = ({ country, weather }) => (
  country && country.selected &&
  weather && weather.city
)

const onSearch = (props) => (event) => {
  if (hasCountryAndWeather(props)) {
    props.dispatch(
      WeatherAction.searchWeather(
        props.country.selected,
        props.weather.city
      )
    )
  }

  event.preventDefault()
}

const getCity = R.pathOr(
  '', ['weather', 'city']
)

export const CityName = (props) => (
  <form
    className={styles.wrap}
    onSubmit={onSearch(props)}
  >
    <label className={styles.label}>
      {'City'}
    </label>
    <input
      className={styles.input}
      onBlur={handleBlur(props)}
      onChange={handleChange(props)}
      onFocus={handleFocus(props)}
      type="text"
      value={getCity(props)}
    />
    <button
      className={styles.button}
      type="submit"
    >
      {'Go'}
    </button>
  </form>
)

export default createComponent(CityName, {
  country: CountryCodesStore,
  weather: WeatherStore
})
