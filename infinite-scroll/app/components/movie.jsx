import R from 'ramda'
import React from 'react'
import MovieAction from '../actions/movie-action'
import MovieStore from '../stores/movie-store'
import styled from 'styled-components'
import { pureRender } from './decorators/pure-render'
import { createComponent } from 'bdux'

const Item = styled.li`
  height: 50px;
`

export const Movie = ({ refItems, movie }) => (
  R.is(Object, movie) && (
    <Item innerRef={refItems}>
      {movie.title}
    </Item>
  )
)

const MovieDecorated = R.compose(
  pureRender
)(Movie)

export default createComponent(MovieDecorated, {
  movie: MovieStore
},
// load the movie details.
MovieAction.load)
