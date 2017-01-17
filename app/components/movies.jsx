import R from 'ramda'
import React from 'react'
import Movie from './movie'
import CountStore from '../stores/count-store'
import styled from 'styled-components'
import { scrollInfinite } from './decorators/scroll-infinite'
import { createComponent } from 'bdux'

const List = styled.ul`
  position: relative;
`

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
  <List innerRef={refList}>
    {renderMovies(count, refItems)}
  </List>
)

const MoviesDecorated = R.compose(
  scrollInfinite
)(Movies)

export default createComponent(MoviesDecorated, {
  count: CountStore
})
