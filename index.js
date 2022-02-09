import { AppRegistry } from "react-native"

import { name as appName } from "./app.json"
import App from "./src/App"

AppRegistry.registerComponent(appName, function () {
  return App
})
