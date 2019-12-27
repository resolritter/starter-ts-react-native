import path from "path"

import { WDIOConfig } from "./types"

export type TargetPlatforms = "android" | "ios"

export const ANDROID_DEVICE_NAME =
  process.env.ANDROID_DEVICE_NAME || "Samsung Galaxy S8 Plus"
export const ANDROID_OS_VERSION = process.env.ANDROID_OS_VERSION || "9.0"
export const ANDROID_APPLICATION_PATH =
  process.env.ANDROID_APPLICATION_PATH ||
  path.resolve(
    __dirname,
    "../android/app/build/outputs/apk/release/app-release.apk",
  )

const secondAsMilliseconds = 1000
export const DEVICE_TIMEOUT =
  (process.env.DEVICE_TIMEOUT && Number(process.env.DEVICE_TIMEOUT)) ||
  20 * secondAsMilliseconds
export const JEST_TIMEOUT =
  (process.env.JEST_TIMEOUT && Number(process.env.JEST_TIMEOUT)) ||
  10 * secondAsMilliseconds

export const IOS_DEVICE_NAME = process.env.IOS_DEVICE_NAME || "iPhone SE"
export const IOS_OS_VERSION = process.env.IOS_OS_VERSION || "11"
export const IOS_APPLICATION_PATH = process.env.IOS_APPLICATION_PATH // FIXME-RT: Provide a real directory here

export const APPIUM_HOST =
  (process.env.APPIUM_HOST as WebdriverIO.Config["hostname"]) || "localhost"
export const APPIUM_LOG_LEVEL: WebdriverIO.Config["logLevel"] =
  (process.env.APPIUM_LOG_LEVEL as WebdriverIO.Config["logLevel"]) || "debug"
export const APPIUM_PORT: WDIOConfig["port"] =
  (process.env.APPIUM_PORT && Number(process.env.APPIUM_PORT)) || 5073
export const APPIUM_USER: WDIOConfig["user"] =
  process.env.APPIUM_USER || undefined

export const TARGET_PLATFORM: TargetPlatforms =
  (process.env.TARGET_PLATFORM as TargetPlatforms) || "android"

if (APPIUM_HOST != "localhost" && !process.env["APPIUM_PASSWORD"]) {
  throw new Error(
    `Running on ${APPIUM_HOST} but environment variable 'APPIUM_PASSWORD' is not set.`,
  )
}

// password is not needed for local
export const APPIUM_PASSWORD =
  APPIUM_HOST == "localhost" ? undefined : process.env["APPIUM_PASWORD"]!
