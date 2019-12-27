import { DEVICE_TIMEOUT, JEST_TIMEOUT, TARGET_PLATFORM } from "../constants"
import configurations from "../device_configurations"
import WebDriver from "webdriver"
import path from "path"
import Labels from "../../src/labels"

describe("Create Android session (wd)", () => {
  let driver: WebDriver.Client

  beforeAll(async () => {
    jest.setTimeout(JEST_TIMEOUT)

    const {
      capabilities: [deviceConfig],
      ...serverConfig
    } = configurations[TARGET_PLATFORM]

    if (process.env.BROWSERSTACK) {
      const _deviceConfig = deviceConfig as any
      _deviceConfig.name = path.basename(__filename, path.extname(__filename))
    }

    console.debug(
      "[beforeAll] initializing driver serverConfig %j and capabilities %j",
      serverConfig,
      deviceConfig,
    )

    // Connect to Appium server
    driver = await WebDriver.newSession({
      ...serverConfig,
      capabilities: deviceConfig,
    })

    driver.launchApp()

    console.info("[beforeAll] driver initialized %j", driver)
  })

  afterAll(async () => {
    driver.closeApp()
  })

  it("Captures the text in the home page", async () => {
    const element = await driver.findElement(
      "id",
      Labels.HomePage.PresentationText,
    )
    expect(await driver.getElementText(element)).toMatchInlineSnapshot(``)
  })
})
