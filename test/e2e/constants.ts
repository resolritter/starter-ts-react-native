import { name as defaultApplicationName } from "package.json"
import * as path from "path"

export type TargetPlatforms = "android"

export const ANDROID_OS_VERSION = process.env.ANDROID_OS_VERSION ?? "8.1"
export const ANDROID_APPLICATION_PATH =
  process.env.ANDROID_APPLICATION_PATH ??
  path.resolve(
    __dirname,
    "../../android/app/build/outputs/apk/release/app-release.apk",
  )

export const APPLICATION_NAME =
  process.env.APPLICATION_NAME ?? defaultApplicationName

const secondAsMilliseconds = 1000
export const DEVICE_TIMEOUT = process.env.DEVICE_TIMEOUT
  ? Number(process.env.DEVICE_TIMEOUT)
  : 20 * secondAsMilliseconds
export const JEST_TIMEOUT = process.env.JEST_TIMEOUT
  ? Number(process.env.JEST_TIMEOUT)
  : 10 * secondAsMilliseconds

export const APPIUM_HOST = process.env.APPIUM_HOST ?? "localhost"
export const APPIUM_PORT = process.env.APPIUM_PORT
  ? Number(process.env.APPIUM_PORT)
  : 4723
export const APPIUM_USER = process.env.APPIUM_USER
