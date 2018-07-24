import * as R from 'ramda'
import React from 'react'
import * as MovieAction from '../actions/movie-action'
import ConfigStore from '../stores/config-store'
import MovieStore from '../stores/movie-store'
import Multiline from './multiline'
import styled from 'styled-components'
import { textOffGrey, backgroundOffWhite } from './color'
import { fontSmall } from './typography'
import { pureRender } from './decorators/pure-render'
import { createComponent } from 'bdux'

const Item = styled.li`
  padding-top: 10px;
`

const ItemInner = styled.div`
  ${backgroundOffWhite}
  position: relative;
  height: 100px;
`

const Image = styled.img`
  height: 100%;
  float: left;
`

const Details = styled.div`
  overflow: hidden;
  padding: 10px;
`

const Title = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: ${({ hasRating }) => hasRating && '49px'};
`

const Release = styled.span`
  ${fontSmall}
`

const Rating = styled.span`
  ${fontSmall}
  position: absolute;
  top: 10px;
  right: 10px;
  margin-top: .1rem;
`

const Star = styled.svg`
  display: inline-block;
  fill: currentColor;
  width: 1.3em;
  height: 1.3em;
  margin: -0.3em 0 0 2px;
  position: relative;
  top: 0.2em;
`

const Overview = styled.div`
  ${backgroundOffWhite}
  ${textOffGrey}
  ${fontSmall}
  margin-right: 1em;
`

const getDefaultSize = R.pathOr(
  '', ['poster_sizes', 0]
)

const get2XSize = R.pathOr(
  '', ['poster_sizes', 1]
)

const getSrc = (config, movie) => (`
  ${config.secure_base_url}${getDefaultSize(config)}/${movie.poster_path}
`)

const getSrcSet = (config, movie) => (`
  ${config.secure_base_url}${getDefaultSize(config)}/${movie.poster_path},
  ${config.secure_base_url}${get2XSize(config)}/${movie.poster_path} 2x
`)

const hasBaseUrl = R.pathOr(
  false, ['images', 'secure_base_url']
)

const hasImage = (movie) => (
  !!movie.poster_path
)

const renderImage = (config, movie) => (
  hasBaseUrl(config) && hasImage(movie) && (
    <Image
      alt={movie.title}
      src={getSrc(config.images, movie)}
      srcSet={getSrcSet(config.images, movie)}
    />
  )
)

const renderStar = () => (
  <Star
    role="img"
    title="Star"
  >
    <use xlinkHref="#star" />
  </Star>
)

const renderRating = (movie) => (
  !!movie.vote_average && (
    <Rating>
      {movie.vote_average}
      {renderStar()}
    </Rating>
  )
)

const renderOverview = (movie) => (
  <Overview>
    <Multiline rows="3">
      {movie.overview}
    </Multiline>
  </Overview>
)

const renderDetails = (movie) => (
  <Details>
    <Title hasRating={movie.vote_average}>
      {movie.title}
    </Title>
    <Release>
      {movie.release_date}
    </Release>
    {renderRating(movie)}
    {renderOverview(movie)}
  </Details>
)

export const Movie = ({ refItems, config, movie }) => (
  R.is(Object, movie) && (
    <Item innerRef={refItems}>
      <ItemInner>
        {renderImage(config, movie)}
        {renderDetails(movie)}
      </ItemInner>
    </Item>
  )
)

const decorate = R.pipe(
  pureRender,
  createComponent(
    {
      config: ConfigStore,
      movie: MovieStore
    },
    // load the movie details.
    MovieAction.load
  )
)

export default decorate(Movie)
