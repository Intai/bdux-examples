import R from 'ramda'
import React from 'react'
import Movie from './movie'
import MoviesStore from '../stores/movies-store'
import styled from 'styled-components'
import { scrollInfinite } from './decorators/scroll-infinite'
import { createComponent } from 'bdux'

const List = styled.ul`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  list-style: none;
  padding: 0;
  margin: 0;
`

const getScrollTop = R.propOr(
  0, 'scrollTop'
)

const renderMovie = R.curry((refItems, index) => (
  <Movie
    index={index}
    key={index}
    refItems={refItems(index)}
  />
))

const renderMoviesByCount = (count, refItems) => (
  R.times(renderMovie(refItems), count)
)

const renderMovies = R.useWith(
  renderMoviesByCount, [
    R.propOr(0, 'count'),
    R.identity
  ]
)

export const Movies = ({ movies, refList, refItems }) => (
  <List
    data-scroll-top={getScrollTop(movies)}
    innerRef={refList}
  >
    {renderMovies(movies, refItems)}
  </List>
)

const MoviesDecorated = R.compose(
  scrollInfinite
)(Movies)

export default createComponent(MoviesDecorated, {
  movies: MoviesStore
})
