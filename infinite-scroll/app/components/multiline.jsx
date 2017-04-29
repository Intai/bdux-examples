import React from 'react'
import styled from 'styled-components'
import { createComponent } from 'bdux'

const Lines = styled.div`
  max-height: ${props => props.rows * 1.2}em;
  line-height: 1.2em;
  position: relative;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
  overflow: hidden;

  &:before {
    content: '…';
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background-color: inherit;
  }
`

export const Multiline = ({ rows, children }) => (
  <Lines rows={rows}>
    {children}
  </Lines>
)

export default createComponent(Multiline)
