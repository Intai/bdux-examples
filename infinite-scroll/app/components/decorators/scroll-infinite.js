import R from 'ramda'
import React from 'react'

const getDisplayName = (Component) => (
  Component.displayName || Component.name || 'Component'
)

export const scrollInfinite = (Component = R.F) => (
  class extends React.Component {
    static displayName = getDisplayName(Component)
    static defaultProps = {}
    state = {}

    /* istanbul ignore next */
    constructor() {
      super()
    }

    componentDidMount() {

    }

    setItem(index, node) {
      this.items = R.assoc(index, node, this.items)
    }

    render() {
      return React.createElement(
        Component, R.merge(this.props, {
          refList: node => this.list = node,
          refItems: index => node => this.setItem(index, node)
        })
      )
    }
  }
)
