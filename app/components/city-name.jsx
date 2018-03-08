import * as R from 'ramda'
import React from 'react'
import CountryCodesStore from '../stores/country-codes-store'
import WeatherStore from '../stores/weather-store'
import WeatherAction from '../actions/weather-action'
import styles from './city-name.scss'
import { createComponent } from 'bdux'

const onChange = (event) => {
  WeatherAction.setCity(event.target.value)
}

const onFocus = () => {
  WeatherAction.setFocus(false)
}

const onBlur = () => {
  WeatherAction.setFocus(true)
}

const hasCountryAndWeather = ({ country, weather }) => (
  country && country.selected &&
  weather && weather.city
)

const onSearch = (props) => (event) => {
  if (hasCountryAndWeather(props)) {
    WeatherAction.searchWeather(
      props.country.selected,
      props.weather.city
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
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
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
