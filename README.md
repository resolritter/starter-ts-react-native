# Introduction

This is an application for React-Native which does not rely on Expo.

The template was created, through the cli, from [react-native-template-typescript](https://github.com/react-native-community/react-native-template-typescript).

# Developing the app

You might need to start the bundler process before launching the application. This workaround may not be needed to all setups and machines (unknown). See [a known workaround](#run-the-js-server-and-development-server-separately) if you run into the problem of not being able to start the application.

If you don't need the workaround, simply do:

`npm run-script [your target platform of choice]`

# Running the tests

## E2E

### Locally, with an emulator

1. Setup the emulator (here's a [link](https://gist.github.com/resolritter/8b8a8b7ccbd119eb4921d8331294a19f) for Arch, although it might apply to other OSes as well).
2. In a separate terminal, after creating the emulator and setting up the SDK, run `emulator @[name of your emulator]`.
3. Launch the appium service with `npx appium`.
4. Run the end-to-end tests with `npm run-script e2e`.

### On BrowserStack, in the cloud

1. _[Instructions inside]_ Create a copy of `env/browserstack/android.env.sample` to `env/browserstack/android.env` with your credentials from BrowserStack.
  - The .env file is ignored by default, so your credentials will not be committed.
2. Build the Android release by running `npm run-script apk:release` (if you do run into problems, see the [Workarounds](#workarounds) section below).
3. Upload the release apk with `npm run-script upload:apk:browserstack`.
4. Finally, run the tests with `npm run-script e2e:android:browserstack`.

# Workarounds

## Symlinks in dependencies cause React-Native to not be able to generate the release APK

Related to bug https://github.com/facebook/metro/issues/1

Regardless of whether they are going into the bundle or not, symlinks in `node_modules` (and perhaps everywhere else) will break the release build.

**A workaround** is to remove the symlinks manually and add them back later through `npm install`. Better solutions might be available in the issue thread.

## Duplicated resources cause React-Native to not be able to generate the release APK

Related to bug https://github.com/facebook/react-native/issues/22234#issuecomment-468545832

**A workaround** is to remove the assets manually. Better solutions might be available in the issue thread.

## Run the JS server and development server separately

Related to bug https://stackoverflow.com/questions/57313661/stuck-on-info-starting-js-server

**A workaround** is to start the server first, so that `npm run-script [platform]` doesn't try to start it as a pre-condition.

**First, run**

`npx react-native start`

**After the server has started, run**

`npm run-script android`

## (Deprecated) `postinstall` script for `typescript-eslint-language-service`

This postinstall script had come to life due to a [unattended MR](https://github.com/Quramy/typescript-eslint-language-service/pull/21) in the upstream repo, which was left there for about a month. In the meanwhile, the script in `scripts/postinstall__typescript-eslint-language-server.js` was written to "patch" the service plugin in the meanwhile.

It seems like this is no longer needed, as the PR has been merged upstream.
