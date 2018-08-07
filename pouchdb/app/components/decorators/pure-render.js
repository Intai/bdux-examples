import * as R from 'ramda'
import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

const getDisplayName = (Component) => (
  `${Component.displayName || Component.name || 'Component'}WithPureRender`
)

const replaceFunctions = R.useWith(
  R.merge, [
    R.identity,
    R.pickBy(R.is(Function))
  ]
)

export const pureRender = (Component = R.F) => (
  class extends React.Component {
    static displayName = getDisplayName(Component)
    static defaultProps = {}
    state = {}

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this,
        replaceFunctions(nextProps, this.props),
        nextState
      )
    }

    render() {
      return React.createElement(
        Component, this.props
      )
    }
  }
)
