# Introduction

This is an application for React-Native which does not rely on Expo.

# Development

1. Run the server: `yarn start`
2. Connect your Android device
  - [For an emulator](https://gist.github.com/resolritter/8b8a8b7ccbd119eb4921d8331294a19f): `emulator @name`
  - For a phone, simply connect it in debug mode and ensure it shows up in `adb list`
3. Run the Android bundler: `yarn android`

# Running the tests

## E2E

### With an emulator

1. Set up the emulator (see
  https://gist.github.com/resolritter/8b8a8b7ccbd119eb4921d8331294a19f for Arch
  Linux, although it might be useful for other operating systems as well).
2. Run `emulator @[name of your emulator]`.
3. Launch the Appium service with `npx appium`
4. Run the end-to-end tests with `yarn e2e`

# Workarounds

## Symlinks in dependencies cause React-Native to not be able to generate the release APK

Related to bug https://github.com/facebook/metro/issues/1

Regardless of whether they are going into the bundle or not, symlinks in
`node_modules` (and perhaps everywhere else) will break the release build.

**A workaround** is to remove the symlinks manually and add them back later
through `yarn install`. Better solutions might be available in the issue
thread.

## Duplicated resources cause React-Native to not be able to generate the release APK

Related to bug
https://github.com/facebook/react-native/issues/22234#issuecomment-468545832

**A workaround** is to remove the assets manually. Better solutions might be
available in the issue thread.

## Run the JS server and development server separately

Related to bug
https://stackoverflow.com/questions/57313661/stuck-on-info-starting-js-server

**A workaround** is to start the server first, so that `yarn [platform]`
doesn't try to start it as a pre-condition.

First run `npx react-native start`

After the server has started, run `yarn android`
