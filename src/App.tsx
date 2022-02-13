import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Provider } from "react-redux"

import { routes } from "./constants"
import Example from "./screens/Example"
import Home from "./screens/Home"
import { store, persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"

const Stack = createNativeStackNavigator()

const App = function () {
  return (
    <Provider {...{ store }}>
      <PersistGate loading={null} {...{ persistor }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={routes.home}
              component={Home}
              options={{
                header: function () {
                  return false
                },
              }}
            />
            <Stack.Screen
              name={routes.example}
              component={Example}
              options={{
                header: function () {
                  return false
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
