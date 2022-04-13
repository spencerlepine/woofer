import puppeteer from "puppeteer"

describe("Woofer Homepage", () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  it("Connects to localhost on PORT 3000", async () => {
    await page.goto("http://localhost:3000")
    expect(true).toBeTruthy()
  })

  afterAll(() => browser.close())
})
