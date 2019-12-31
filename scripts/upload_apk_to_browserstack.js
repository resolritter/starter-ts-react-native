#!/usr/bin/env node

const http = require("http")
const path = require("path")
const fs = require("fs")
const req = require("request")

const { name: applicationName } = require("../package.json")

function exitWithError(err) {
  console.error(err)
  process.exit(1)
}

const requiredEnvironmentVariables = ["APPIUM_USER", "APPIUM_PASSWORD"]

for (const envVar of requiredEnvironmentVariables) {
  if (!process.env[envVar]) {
    exitWithError(`${envVar} not set.`)
  }
}

const appPath = path.resolve(
  __dirname,
  "../android/app/build/outputs/apk/release/app-release.apk",
)
if (!fs.existsSync(appPath)) {
  exitWithError(`Application path not found at ${appPath}.`)
}

const automateEndpoint =
  "https://api-cloud.browserstack.com/app-automate/upload"
;(async function() {
  await new Promise(function(resolve, reject) {
    console.log(`Beginning upload to '${automateEndpoint}'...`)
    req.post(
      {
        auth: {
          user: process.env.APPIUM_USER,
          password: process.env.APPIUM_PASSWORD,
        },
        url: automateEndpoint,
        formData: {
          file: fs.createReadStream(appPath),
          data: JSON.stringify({ custom_id: applicationName }),
        },
      },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      },
    )
  })
    .then(function(body) {
      function requestWentWrong(body) {
        exitWithError(`
          Something went wrong. Response returned:
          ${body}

          It should have returned something like this:

          {"app_url":"bs://bdcba0ff659087b513cb97c2103851562cb06351","custom_id":"ReactNativePrototype","shareable_id":"username/ReactNativePrototype"}
        `)
      }

      let jsonResponse = {}
      // sometimes it goes wrong and it returns an HTML page
      try {
        jsonResponse = JSON.parse(body)
      } catch (err) {
        requestWentWrong(body)
      }

      if (jsonResponse["custom_id"]) {
        console.log("Success! Response was:", jsonResponse)
      } else {
        requestWentWrong(JSON.stringify(jsonResponse))
      }
    })
    .catch(function (err) {
      console.error(err)
    })
})()
