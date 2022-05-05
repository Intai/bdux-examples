import * as R from 'ramda'
import React from 'react'
import Movie from './movie'
import MoviesStore from '../stores/movies-store'
import styled from 'styled-components'
import { textGrey } from './color'
import { fontSans } from './typography'
import { useScrollInfinite } from './decorators/scroll-infinite'
import { createUseBdux } from 'bdux'

const Container = styled.div`
  ${fontSans}
  ${textGrey}
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const Padding = styled.div`
  height: ${({ top }) => top}px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto 100% auto;
  max-width: 480px;
  width: 100%;
`

const getIndices = R.propOr(
  [], 'indices'
)

const getScrollId = R.propOr(
  0, 'scrollId'
)

const getScrollTop = R.propOr(
  0, 'scrollTop'
)

const getTop = R.propOr(
  0, 'top'
)

const useBdux = createUseBdux({
  movies: MoviesStore,
})

export const Movies = (props) => {
  const { state } = useBdux(props)
  const { refList, refItems } = useScrollInfinite(props)
  const { movies } = state

  return (
    <Container
      data-scroll-id={getScrollId(movies)}
      data-scroll-top={getScrollTop(movies)}
      ref={refList}
    >
      <Padding top={getTop(movies)} />
      <List>
        {getIndices(movies).map(index => (
          <Movie
            index={index}
            key={index}
            refItem={refItems(index)}
          />
        ))}
      </List>
    </Container>
  )
}

export default React.memo(Movies)
