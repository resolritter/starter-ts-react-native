import * as path from "path"

import {
  ANDROID_OS_VERSION,
  APPIUM_HOST,
  APPIUM_PORT,
  APPIUM_USER,
  DEVICE_TIMEOUT,
} from "./constants"
import { WebDriverConfig } from "./types"

export const android: WebDriverConfig = {
  hostname: APPIUM_HOST,
  port: APPIUM_PORT,
  logLevel: "info",
  user: APPIUM_USER,
  waitforTimeout: DEVICE_TIMEOUT,
  capabilities: [
    {
      deviceReadyTimeout: DEVICE_TIMEOUT,
      newCommandTimeout: DEVICE_TIMEOUT,
      app: path.resolve("android/app/build/outputs/apk/debug/app-debug.apk"),
      platformName: "Android",
      platformVersion: ANDROID_OS_VERSION,
      automationName: "UiAutomator2",
    },
  ],
}
