import React from "react"
import { Button, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { flexCenterColumn } from "src/styles"
import { State } from "src/store"
import { counterStore } from "src/store/counter"

const Home = function () {
  const count = useSelector<State>(function ({
    counter: { count: storeCount },
  }) {
    return storeCount
  })
  const dispatch = useDispatch()

  return (
    <View style={[flexCenterColumn]}>
      <Text>{"Example stacked page for navigation"}</Text>
      <Text>Count: {count}</Text>
      <Button
        onPress={function () {
          dispatch(counterStore.actions.change(1))
        }}
        title="Increase count"
      />
    </View>
  )
}

export default Home
