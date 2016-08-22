import R from 'ramda'
import React from 'react'
import Common from '../utils/common-util'
import { ListView, View, Text } from 'react-native'
import StopwatchStore from '../stores/stopwatch-store'
import styles from './laps-style'
import { createComponent } from 'bdux'

const getTimeFrom = R.propOr(
  0, 'timeFrom'
)

const getLaps = R.propOr(
  [], 'laps'
)

const updateDataSource = (dataSource, intervals) => (
  dataSource.cloneWithRows(intervals,
    R.reverse(R.range(0, intervals.length)))
)

const createDataSource = (() => {
  let dataSource = new ListView.DataSource({
    rowHasChanged: R.complement(R.identical) })

  return (intervals) => (
    dataSource = updateDataSource(dataSource, intervals)
  )
})()

const accumLapInterval = (timeFrom, timeTo) => (
  [timeTo, timeTo - timeFrom]
)

const accumLapIntervals = R.pipe(
  R.converge(
    R.mapAccum(accumLapInterval), [
      getTimeFrom,
      getLaps
    ]
  ), R.nth(1)
)

const plusOne = (num) => (
  parseInt(num, 10) + 1
)

const renderLap = (interval, sectionId, rowId) => (
  <View key={ sectionId + rowId }
    style={ styles.item }>

    <Text style={ styles.index }>
      Lap { plusOne(rowId) }
    </Text>
    <Text style={ styles.interval }>
      { Common.formatTimeInterval(interval) }
    </Text>
  </View>
)

const renderSeparator = (sectionId, rowId) => (
  <View key={ sectionId + rowId }
    style={ styles.separator } />
)

export const Laps = ({ stopwatch }) => (
  <View style={ styles.wrap }>
    <ListView style={ styles.list }
      dataSource={ createDataSource(accumLapIntervals(stopwatch)) }
      renderRow={ renderLap }
      renderSeparator={ renderSeparator }
      enableEmptySections={ true }
      showsVerticalScrollIndicator={ false } />
  </View>
)

export default createComponent(Laps, {
  stopwatch: StopwatchStore
})