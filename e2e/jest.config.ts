import Configurations from "./DeviceConfigurations"
import { TARGET_PLATFORM } from "./Constants"

module.exports = {
  displayName: "e2e",
  testEnvironment: "jest-environment-webdriverio",
  testEnvironmentOptions: {
    ...Configurations[TARGET_PLATFORM],
    capabilities: Configurations[TARGET_PLATFORM].capabilities[0],
  },
}
