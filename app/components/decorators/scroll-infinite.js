import R from 'ramda'
import React from 'react'

const getDisplayName = (Component) => (
  Component.displayName || Component.name || 'Component'
)

const hasOnUpdate = R.propIs(
  Function, 'onUpdate'
)

const hasList = R.prop(
  'list'
)

const isListVisible = ({ list }) => (
  list && list instanceof Element
    && list.tagName !== 'NOSCRIPT'
)

const setItemByIndex = (index, item, items) => {
  const clone = items.slice(0)
  clone[index] = item
  return clone
}

const removeItem = R.converge(
  R.drop, [
    R.identity,
    R.nthArg(2)
  ]
)

const setItem = R.ifElse(
  R.nthArg(1),
  setItemByIndex,
  removeItem
)

const memoizeProp = (propName, func) => {
  const props = []
  return (args) => {
    const prop = args[propName];
    if (props.indexOf(prop) < 0) {
      props.push(prop)
      func(args)
    }
  }
}

const bindScrollEventOnList = memoizeProp('list', (args) => {
  args.list.addEventListener('scroll', () => scrollToItems(args))
})

const mergeProp = (func) => R.converge(
  R.merge, [
    R.identity,
    func
  ]
)

const calcAvgItemHeight = mergeProp(({ items }) => (
  R.pipe(
    R.defaultTo([]),
    R.pluck('offsetHeight'),
    R.mean,
    R.defaultTo(0),
    R.objOf('itemHeight')
  )(items)
))

const getListDimension = mergeProp(({ list }) => ({
  scrollTop: list.scrollTop,
  listHeight: list.offsetHeight
}))

const calcItemsRangeFrom = mergeProp(({ scrollTop, listHeight, itemHeight }) => ({
  itemsRangeFrom: (itemHeight)
    ? Math.floor(Math.max(0, scrollTop - listHeight) / itemHeight)
    : 0
}))

const calcItemsRangeCount = mergeProp(({ listHeight, itemHeight }) => ({
  itemsRangeCount: (itemHeight)
    ? Math.floor(listHeight * 3 / itemHeight)
    : 1
}))

const calcItemsTop = mergeProp(({ itemHeight, itemsRangeFrom }) => ({
  itemsTop: itemsRangeFrom * itemHeight
}))

const findPrevCallIndex = R.useWith(
  R.findIndex, [
    R.propEq(0),
    R.identity
  ]
)

const callIfNotDupe = (index, currentCall, prevCalls) => {
  const prevCall = R.nth(index, prevCalls)
  if (!R.equals(currentCall, prevCall)) {
    R.apply(R.call, currentCall)
  }
}

const tailArgs = (func) => (first, ...rest) => (
  func.apply(func, rest)
)

const updateOrAppend = R.ifElse(
  R.lte(0),
  R.update,
  tailArgs(R.append)
)

const callThenUpdate = R.pipe(
  R.juxt([
    callIfNotDupe,
    updateOrAppend
  ]),
  R.last
)

const skipDuplicates = (() => {
  let prevCalls = []
  return (func, args) => {
    const index = findPrevCallIndex(func, prevCalls)
    prevCalls = callThenUpdate(index, [func, args], prevCalls)
  }
})()

const triggerUpdate = ({ itemsTop, itemsRangeFrom, itemsRangeCount, onUpdate }) => {
  skipDuplicates(onUpdate, {
    itemsTop,
    itemsRangeFrom,
    itemsRangeCount
  })
}

const scrollToItems = R.when(
  R.allPass([hasOnUpdate, hasList, isListVisible]),
  R.pipe(
    R.tap(bindScrollEventOnList),
    calcAvgItemHeight,
    getListDimension,
    calcItemsRangeFrom,
    calcItemsRangeCount,
    calcItemsTop,
    triggerUpdate
  )
)

export const scrollInfinite = (Component = R.F) => (
  class extends React.Component {
    static displayName = getDisplayName(Component)
    static defaultProps = {}
    state = {}
    items = []

    /* istanbul ignore next */
    constructor() {
      super()
    }

    componentDidMount() {
      this.scrollToItems()
    }

    scrollToItems() {
      scrollToItems(R.merge(
        R.pick(['list', 'items'], this),
        R.pick(['onUpdate'], this.props)
      ))
    }

    scrollToItemsForNode(node) {
      if (node) {
        this.scrollToItems()
      }
    }

    setList(node) {
      this.list = node
      this.scrollToItemsForNode(node)
    }

    setItem(index, node) {
      this.items = setItem(index, node, this.items)
      this.scrollToItemsForNode(node)
    }

    render() {
      return React.createElement(
        Component, R.merge(this.props, {
          refList: node => this.setList(node),
          refItems: index => node => this.setItem(index, node)
        })
      )
    }
  }
)
