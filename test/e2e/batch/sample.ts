import { labels } from "src/constants"

describe("Create Android session (wd)", function () {
  it("Captures the sample text in the Home page", async function () {
    const wholeApp = await browser.$(`~${labels.Root}`)
    await wholeApp.waitForDisplayed({ timeout: 3000 })

    const presentationElement = await browser.$(
      `~${labels.HomePage.PresentationText}`,
    )
    expect(
      await browser.getElementText(presentationElement.elementId),
    ).toMatchInlineSnapshot(`"HomePage__PresentationText"`)
  })
})
