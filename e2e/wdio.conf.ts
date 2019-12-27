import {
  ANDROID_APPLICATION_PATH,
  ANDROID_DEVICE_NAME,
  ANDROID_OS_VERSION,
  APPIUM_HOST,
  APPIUM_LOG_LEVEL,
  APPIUM_PASSWORD,
  APPIUM_PORT,
  APPIUM_USER,
  DEVICE_TIMEOUT,
  IOS_APPLICATION_PATH,
  IOS_DEVICE_NAME,
  IOS_OS_VERSION,
  TARGET_PLATFORM,
} from "./constants"

import { WDIOConfig } from "./types"

import { name } from "../package.json"
import { version as appiumVersion } from "appium/package.json"

const common: WDIOConfig = {
  hostname: APPIUM_HOST,
  port: APPIUM_PORT,
  logLevel: APPIUM_LOG_LEVEL,
  user: APPIUM_USER,
  key: APPIUM_PASSWORD,
  waitforTimeout: DEVICE_TIMEOUT,
  capabilities: [
    {
      platformVersion: appiumVersion,
      deviceReadyTimeout: DEVICE_TIMEOUT,
      newCommandTimeout: DEVICE_TIMEOUT,
    },
  ],
}

let android, ios: WDIOConfig

// https://www.browserstack.com/automate/capabilities?tag=selenium-4
//if (process.env.BROWSERSTACK) {
const browserstackBase: WDIOConfig = {
  ...common,
  capabilities: [
    {
      ...common.capabilities[0],
      ["bstack:options"]: {
        userName: APPIUM_USER,
        accessKey: APPIUM_PASSWORD,
        realMobile: true,
        debug: true,
        video: false,
        local: false,
        networkLogs: true,
        buildName: `BROWSERSTACK:${TARGET_PLATFORM}`,
      },
    },
  ],
}

android = {
  ...browserstackBase,
  capabilities: [
    {
      ...browserstackBase.capabilities[0],
      platformName: "Android",
      automationName: "UiAutomator2",
      ["bstack:options"]: {
        ...browserstackBase.capabilities[0]["bstack:options"],
        deviceName: ANDROID_DEVICE_NAME,
        appiumVersion,
        osVersion: ANDROID_OS_VERSION,
        app: ANDROID_APPLICATION_PATH,
      },
    },
  ],
}

ios = {
  ...browserstackBase,
  capabilities: [
    {
      ...browserstackBase.capabilities[0],
      platformName: "iOS",
      automationName: "XCUITest",
      ["bstack:options"]: {
        ...browserstackBase.capabilities[0]["bstack:options"],
        appiumVersion,
        deviceName: IOS_DEVICE_NAME,
        osVersion: IOS_OS_VERSION,
        app: IOS_APPLICATION_PATH,
      },
    },
  ],
}
//}

// SauceLabs -> https://github.com/saucelabs-sample-test-frameworks/JS-wdio4-cucumberJS/blob/master/tests/config/wdio.conf.js
//if (process.env.SAUCE) {
//}

export { android, ios }
