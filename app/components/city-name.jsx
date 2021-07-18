import * as R from 'ramda'
import React, { useMemo } from 'react'
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

const handleSearch = (country, weather, dispatch) => (event) => {
  if (country && weather
    && country.selected && weather.city) {
    dispatch(
      WeatherAction.searchWeather(
        country.selected,
        weather.city
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

export function CityName(props) {
  const { state, dispatch } = useBdux(props)
  const { country, weather } = state
  const handleSearchCb = useMemo(() => handleSearch(country, weather, dispatch), [])
  const handleBlurCb = useMemo(() => handleBlur(dispatch), [])
  const handleChangeCb = useMemo(() => handleChange(dispatch), [])
  const handleFocusCb = useMemo(() => handleFocus(dispatch), [])

  return (
    <form
      className={styles.wrap}
      onSubmit={handleSearchCb}
    >
      <label className={styles.label}>
        {'City'}
      </label>
      <input
        className={styles.input}
        type="text"
        value={getCity(state)}
        onBlur={handleBlurCb}
        onChange={handleChangeCb}
        onFocus={handleFocusCb}
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
