import * as R from 'ramda'
import { useMemo, useEffect } from 'react'

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

const shouldUpdateScroll = R.either(
  R.prop('itemHeight'),
  R.propSatisfies(R.isEmpty, 'items')
)

const setItemByIndex = (index, node) => (items) => {
  const clone = items.slice(0)
  clone[index] = node
  return clone
}

const setItem = (index, node) => (
  node
    ? setItemByIndex(index, node)
    : R.remove(index, 1)
)

const onceForProp = (propName, func) => {
  const propArray = []
  return (args) => {
    const prop = args[propName]
    if (propArray.indexOf(prop) < 0) {
      propArray.push(prop)
      func(args)
    }
  }
}

const bindScrollEventOnList = onceForProp('list', ({ list, scrollToCurrItems }) => {
  list.addEventListener('scroll', scrollToCurrItems)
})

const mergeProp = (func) => R.converge(
  R.mergeRight, [
    R.identity,
    func
  ]
)

const calcAvgItemHeight = mergeProp(({ items }) => (
  R.pipe(
    R.defaultTo([]),
    R.pluck('offsetHeight'),
    R.filter(R.identity),
    R.mean,
    R.defaultTo(0),
    R.objOf('itemHeight')
  )(items)
))

const getListDimension = mergeProp(({ list }) => ({
  scrollTop: list.scrollTop,
  listHeight: list.offsetHeight,
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
  dataScrollId: list.dataset.scrollId,
  dataScrollTop: list.dataset.scrollTop,
}))

const createScrollToDataAttrs = () => {
  let prevScrollId = 0
  return ({ list, scrollEvent, dataScrollId, dataScrollTop }) => {
    (!scrollEvent && dataScrollId <= prevScrollId)
      ? list.scrollTop = dataScrollTop
      : prevScrollId = dataScrollId
  }
}

const callScrollToDataAttrs = R.converge(
  R.call, [
    R.prop('scrollToDataAttrs'),
    R.identity
  ]
)

const isUpdateArgsEqual = (current) => R.where({
  itemsTop: R.equals(current.itemsTop),
  itemsRangeFrom: R.equals(current.itemsRangeFrom),
  itemsRangeCount: R.lte(current.itemsRangeCount)
})

const createSkipDuplicates = (() => {
  const prevCalls = new Map()
  return (func, args) => {
    const prevArgs = prevCalls.get(func)

    // remember the arguments to skip repeated calls.
    prevCalls.set(func, args)
    // if the function call is different.
    if (!prevArgs || !isUpdateArgsEqual(args)(prevArgs)) {
      func(args)
    }
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

export const useScrollInfinite = ({ onUpdate }) => {
  const refs = useMemo(() => {
    const current = {
      list: null,
      items: [],
    }

    const skipDuplicates = createSkipDuplicates()
    const scrollToDataAttrs = createScrollToDataAttrs()
    const scrollToCurrItems = (e) => {
      scrollToItems({
        skipDuplicates,
        scrollToDataAttrs,
        scrollEvent: e,
        list: current.list,
        items: current.items,
        onUpdate,
      })
    }

    return {
      current,
      scrollToCurrItems,
      refList: node => {
        current.list = node
        if (node) {
          requestAnimationFrame(() => scrollToCurrItems())
          bindScrollEventOnList({
            list: node,
            scrollToCurrItems,
          })
        }
      },
      refItems: R.memoizeWith(R.identity, index => node => {
        current.items = setItem(index, node)(current.items)
        if (node) {
          requestAnimationFrame(() => scrollToCurrItems())
        }
      }),
    }
  }, [onUpdate])

  useEffect(() => {
    refs.scrollToCurrItems()
  // only when didMount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return refs
}
