import React from 'react'
import MovieStore from '../stores/movie-store'
import { createComponent } from 'bdux'

const renderMovie = (movie) => (
  <li>{movie.title}</li>
)

export const Movie = ({ movie }) => (
  (movie)
    ? renderMovie(movie)
    : false
)

export default createComponent(Movie, {
  movie: MovieStore
})
