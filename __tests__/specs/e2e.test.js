import puppeteer from "puppeteer"

describe("Woofer Homepage", () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  it("Connects to localhost", async () => {
    await page.goto("http://localhost")
    expect(true).toBeTruthy()
  })

  afterAll(() => browser.close())
})
