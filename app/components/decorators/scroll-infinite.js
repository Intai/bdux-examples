import R from 'ramda'
import React from 'react'

const getDisplayName = (Component) => (
  Component.displayName || Component.name || 'Component'
)

const whenReady = requestAnimationFrame
  || (func => setTimeout(func, 0));

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

const shouldUpdateScroll = R.anyPass([
  R.prop('itemHeight'),
  R.propSatisfies(R.isEmpty, 'items')
])

const setItemByIndex = (index, item, items) => {
  const clone = items.slice(0)
  clone[index] = item
  return clone
}

const removeItem = R.converge(
  R.remove, [
    R.identity,
    R.always(1),
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

const bindScrollEventOnList = memoizeProp('list', (component) => {
  component.list.addEventListener('scroll',
    R.bind(component.scrollToItems, component))
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
    R.values,
    R.pluck('offsetHeight'),
    R.filter(R.identity),
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

const getListDataAttrs = mergeProp(({ list }) => ({
  dataScrollId: list.getAttribute('data-scroll-id'),
  dataScrollTop: list.getAttribute('data-scroll-top')
}))

const createScrollToDataAttrs = (() => {
  let prevScrollId = 0
  return ({ list, scrollEvent, dataScrollId, dataScrollTop }) => {
    (!scrollEvent && dataScrollId <= prevScrollId)
      ? list.scrollTop = dataScrollTop
      : prevScrollId = dataScrollId
  }
})

const callScrollToDataAttrs = R.converge(
  R.call, [
    R.prop('scrollToDataAttrs'),
    R.identity
  ]
)

const findPrevCallIndex = R.useWith(
  R.findIndex, [
    R.propEq(0),
    R.identity
  ]
)

const getUpdateArgs = R.ifElse(
  R.is(Array),
  R.nth(1),
  R.always({})
)

const isUpdateArgsEqual = R.uncurryN(2, (current) => R.where({
  itemsTop: R.equals(current.itemsTop),
  itemsRangeFrom: R.equals(current.itemsRangeFrom),
  itemsRangeCount: R.lte(current.itemsRangeCount)
}))

const isUpdateCallEqual = R.useWith(
  isUpdateArgsEqual, [
    getUpdateArgs,
    getUpdateArgs
  ]
)

const callIfNotDupe = (index, currentCall, prevCalls) => {
  const prevCall = R.nth(index, prevCalls)
  if (!isUpdateCallEqual(currentCall, prevCall)) {
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

const createSkipDuplicates = (() => {
  let prevCalls = []
  return (func, args) => {
    const index = findPrevCallIndex(func, prevCalls)
    prevCalls = callThenUpdate(index, [func, args], prevCalls)
  }
})

const getScrollId = (() => {
  let id = 0
  return () => ++id
})()

const triggerUpdate = ({ scrollTop, itemsTop, itemsRangeFrom, itemsRangeCount, skipDuplicates, onUpdate }) => {
  skipDuplicates(onUpdate, {
    scrollId: getScrollId(),
    scrollTop,
    itemsTop,
    itemsRangeFrom,
    itemsRangeCount
  })
}

const triggerScrollUpdate = R.when(
  shouldUpdateScroll,
  R.juxt([
    callScrollToDataAttrs,
    triggerUpdate
  ])
)

const throttle = (func) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(func, args)
    }, 0)
  }
}

const scrollToItems = throttle(R.when(
  R.allPass([hasOnUpdate, hasList, isListVisible]),
  R.pipe(
    calcAvgItemHeight,
    getListDataAttrs,
    getListDimension,
    calcItemsRangeFrom,
    calcItemsRangeCount,
    calcItemsTop,
    triggerScrollUpdate
  )
))

export const scrollInfinite = (Component = R.F) => (
  class extends React.Component {
    static displayName = getDisplayName(Component)
    static defaultProps = {}
    skipDuplicates = createSkipDuplicates()
    scrollToDataAttrs = createScrollToDataAttrs()
    state = {}
    items = []

    /* istanbul ignore next */
    constructor() {
      super()
    }

    componentDidMount() {
      this.scrollToItems()
    }

    scrollToItems(e) {
      scrollToItems(
        R.mergeAll([
          R.objOf('scrollEvent', e),
          R.pick(['list', 'items', 'skipDuplicates', 'scrollToDataAttrs'], this),
          R.pick(['onUpdate'], this.props)
        ])
      )
    }

    setList(node) {
      this.list = node
      if (node) {
        whenReady(this.scrollToItems.bind(this, null))
        bindScrollEventOnList(this)
      }
    }

    setItem(index, node) {
      this.items = setItem(index, node, this.items)
      if (node) {
        whenReady(this.scrollToItems.bind(this, null))
      }
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
