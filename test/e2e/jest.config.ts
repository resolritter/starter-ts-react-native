import { android } from "./configuration"

module.exports = {
  displayName: "e2e",
  testEnvironment: "jest-environment-webdriverio",
  testEnvironmentOptions: { ...android, capabilities: android.capabilities[0] },
}
