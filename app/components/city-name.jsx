import * as R from 'ramda'
import React from 'react'
import CountryCodesStore from '../stores/country-codes-store'
import WeatherStore from '../stores/weather-store'
import * as WeatherAction from '../actions/weather-action'
import styles from './city-name.scss'
import { createUseBdux } from 'bdux'

const handleChange = (dispatch) => (event) => {
  dispatch(WeatherAction.setCity(event.target.value))
}

const handleFocus = (dispatch) => () => {
  dispatch(WeatherAction.setFocus(false))
}

const handleBlur = (dispatch) => () => {
  dispatch(WeatherAction.setFocus(true))
}

const hasCountryAndWeather = ({ country, weather }) => (
  country && country.selected &&
  weather && weather.city
)

const onSearch = (state, dispatch) => (event) => {
  if (hasCountryAndWeather(state)) {
    dispatch(
      WeatherAction.searchWeather(
        state.country.selected,
        state.weather.city
      )
    )
  }

  event.preventDefault()
}

const getCity = R.pathOr(
  '', ['weather', 'city']
)

const useBdux = createUseBdux({
  country: CountryCodesStore,
  weather: WeatherStore
})

export const CityName = (props) => {
  const { state, dispatch } = useBdux(props)
  return (
    <form
      className={styles.wrap}
      onSubmit={onSearch(state, dispatch)}
    >
      <label className={styles.label}>
        {'City'}
      </label>
      <input
        className={styles.input}
        onBlur={handleBlur(dispatch)}
        onChange={handleChange(dispatch)}
        onFocus={handleFocus(dispatch)}
        type="text"
        value={getCity(state)}
      />
      <button
        className={styles.button}
        type="submit"
      >
        {'Go'}
      </button>
    </form>
  )
}

export default CityName
