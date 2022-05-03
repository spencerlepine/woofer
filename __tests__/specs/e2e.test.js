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
    await page.goto(homeURL, {
      timeout: 10000,
      waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
    })

    expect(true).toBeTruthy()
  })

  it("should render root div", async () => {
    await page.waitForSelector("#root")
    // const text = await page.$eval(".App", (e) => e.textContent);
    const root = await page.$eval("#root", (e) => e.innerHTML)
    console.log(root)
    expect(root).toBeTruthy()
  })

  it("should not render firebase error", (done) => {
    page
      .$eval("#firebase-error")
      .then((e) => {
        console.log(e.innerHTML)
      })
      .catch((err) => err)
      .then((result) => {
        expect(result).toBeDefined()
        done()
      })
  })

  it("should not render firebase error", (done) => {
    page
      .$eval("#api-error")
      .then((e) => {
        console.log(e.innerHTML)
      })
      .catch((err) => err)
      .then((result) => {
        expect(result).toBeDefined()
        done()
      })
  })

  it("should render React App component", async () => {
    await page.waitForSelector(".App")
    // const text = await page.$eval(".App", (e) => e.textContent);
    const AppComponent = await page.$eval(".App", (e) => e.innerHTML)
    console.log(AppComponent)
    expect(AppComponent).toBeTruthy()
  })

  it("should render navbar", async () => {
    await page.waitForSelector(".navbar")
    const AppComponent = await page.$eval(".navbar", (e) => e.innerHTML)
    expect(AppComponent).toBeTruthy()
  })

  it("should render footer", async () => {
    await page.waitForSelector(".footer")
    const AppComponent = await page.$eval(".footer", (e) => e.innerHTML)
    expect(AppComponent).toBeTruthy()
  })

  afterAll(() => browser.close())
})
