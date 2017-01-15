import R from 'ramda'
import React from 'react'
import Movie from './movie'
import CountStore from '../stores/count-store'
import classNames from 'classnames/bind'
import styles from './movies.scss'
import { scrollInfinite } from './decorators/scroll-infinite'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles)

const getListClassName = () => cssModule({
  'list': true
})

const renderMovie = R.curry((refItems, index) => (
  <Movie
    index={index}
    refItems={refItems(index)}
  />
))

const renderMoviesByCount = (count, refItems) => (
  R.times(renderMovie(refItems), count)
)

const renderMovies = R.ifElse(
  R.lt(0),
  renderMoviesByCount,
  R.F
)

export const Movies = ({ count, refList, refItems }) => (
  <ul
    className={getListClassName()}
    ref={refList}
  >
    {renderMovies(count, refItems)}
  </ul>
)

const MoviesDecorated = R.compose(
  scrollInfinite
)(Movies)

export default createComponent(MoviesDecorated, {
  count: CountStore
})
