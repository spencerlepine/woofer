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

  it("should render React App component", async () => {
    await page.waitForSelector(".App")
    // const text = await page.$eval(".App", (e) => e.textContent);
    const AppComponent = await page.$eval(".App", (e) => e.innerHTML)
    expect(AppComponent).toBeTruthy()
  })

  it("should render React App component", async () => {
    await page.waitForSelector(".App")
    // const text = await page.$eval(".App", (e) => e.textContent);
    const AppComponent = await page.$eval(".App", (e) => e.innerHTML)
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
