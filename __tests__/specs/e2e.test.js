import puppeteer from "puppeteer"

describe("Woofer Homepage", () => {
  let browser
  let page

  const homeURL = "http://localhost:3000"

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  it("Connects to localhost on PORT 3000", async () => {
    // await page.goto(homeURL, {
    //   timeout: 10000,
    //   waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
    // })
    await page.goto(homeURL)

    expect(true).toBeTruthy()
  })

  it("should not render root div", async () => {
    await page.waitForSelector("#root")

    const selector = "#root"
    const elemExists = await page
      .$eval(selector, () => {
        console.log(e.innerHTML)
        return true
      })
      .catch(() => false)
    expect(elemExists).not.toBeTruthy()
  })

  it("should not render firebase error", async () => {
    const selector = ".firebaseError"
    const elemExists = await page
      .$eval(selector, () => {
        console.log(e.innerHTML)
        return true
      })
      .catch(() => false)
    expect(elemExists).not.toBeTruthy()
  })

  it("should not render api error", async () => {
    const selector = ".apiError"
    const elemExists = await page
      .$eval(selector, () => {
        console.log(e.innerHTML)
        return true
      })
      .catch(() => false)
    expect(elemExists).not.toBeTruthy()
  })

  it("should render React App component", async () => {
    const selector = ".App"
    const elemExists = await page.$eval(selector, () => true).catch(() => false)
    expect(elemExists).toBeTruthy()
  })

  it("should render navbar component", async () => {
    const selector = ".navbar"
    const elemExists = await page.$eval(selector, () => true).catch(() => false)
    expect(elemExists).toBeTruthy()
  })

  it("should render footer component", async () => {
    const selector = ".footer"
    const elemExists = await page.$eval(selector, () => true).catch(() => false)
    expect(elemExists).toBeTruthy()
  })

  afterAll(() => browser.close())
})
