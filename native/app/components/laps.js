import * as R from 'ramda'
import React from 'react'
import Common from '../utils/common-util'
import { FlatList, View, Text } from 'react-native'
import StopwatchStore from '../stores/stopwatch-store'
import styles from './laps-style'
import { createComponent } from 'bdux'

const getTimeFrom = R.propOr(
  0, 'timeFrom'
)

const getLaps = R.propOr(
  [], 'laps'
)

const accumLapInterval = (timeFrom, timeTo) => (
  [timeTo, timeTo - timeFrom]
)

const accumLapIntervals = R.pipe(
  R.converge(
    R.mapAccum(accumLapInterval), [
      getTimeFrom,
      getLaps
    ]
  ),
  R.nth(1),
  R.reverse
)

const keyExtractor = (interval, index) => (
  index.toString()
)

const renderLap = R.curry((stopwatch, { item: interval, index }) => (
  <View style={styles.item}>
    <Text style={styles.index}>
      {`Lap ${getLaps(stopwatch).length - index}`}
    </Text>
    <Text style={styles.interval}>
      {Common.formatTimeInterval(interval)}
    </Text>
  </View>
))

const renderSeparator = () => (
  <View style={styles.separator} />
)

export const Laps = ({ stopwatch }) => (
  <View style={styles.wrap}>
    <FlatList
      data={accumLapIntervals(stopwatch)}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={keyExtractor}
      renderItem={renderLap(stopwatch)}
      style={styles.list}
    />
  </View>
)

export default createComponent(Laps, {
  stopwatch: StopwatchStore
})
