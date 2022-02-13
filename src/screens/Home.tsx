import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { Button, Text, View } from "react-native"

import { routes } from "src/constants"
import { flexCenterColumn } from "src/styles"
import { RootStackParamList } from "src/types"

const Home = function ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "home">
}) {
  return (
    <View style={[flexCenterColumn]}>
      <Text>{"Hello world!"}</Text>
      <Button
        onPress={function () {
          navigation.navigate(routes.example)
        }}
        title="Go to example page"
      />
    </View>
  )
}

export default Home
