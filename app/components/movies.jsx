import R from 'ramda'
import React from 'react'
import Movie from './movie'
import MoviesStore from '../stores/movies-store'
import styled from 'styled-components'
import { pureRender } from './decorators/pure-render'
import { scrollInfinite } from './decorators/scroll-infinite'
import { createComponent } from 'bdux'

const Container = styled.div`
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.top}px 0 0 0;
`

const getScrollId = R.propOr(
  0, 'scrollId'
)

const getScrollTop = R.propOr(
  0, 'scrollTop'
)

const getTop = R.propOr(
  0, 'top'
)

const renderMovie = R.curry((refItems, index, offset) => (
  <Movie
    index={index}
    key={index}
    refItems={refItems(offset)}
  />
))

const renderMoviesByIndices = (indices, refItems) => (
  R.addIndex(R.map)(renderMovie(refItems), indices)
)

const renderMovies = R.useWith(
  renderMoviesByIndices, [
    R.propOr([], 'indices'),
    R.identity
  ]
)

export const Movies = ({ movies, refList, refItems }) => (
  <Container
    data-scroll-id={getScrollId(movies)}
    data-scroll-top={getScrollTop(movies)}
    innerRef={refList}
  >
    <List top={getTop(movies)}>
      {renderMovies(movies, refItems)}
    </List>
  </Container>
)

const MoviesDecorated = R.compose(
  pureRender,
  scrollInfinite
)(Movies)

export default createComponent(MoviesDecorated, {
  movies: MoviesStore
})
