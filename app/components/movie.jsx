import React from 'react'
import MovieStore from '../stores/movie-store'
import styled from 'styled-components'
import { createComponent } from 'bdux'

const Item = styled.li`
  height: 50px;
`

export const Movie = ({ refItems }) => (
  <Item innerRef={refItems} />
)

export default createComponent(Movie, {
  movie: MovieStore
})
