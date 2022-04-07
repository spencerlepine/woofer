import React from "react"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

const history = createBrowserHistory()

jest.mock("axios", () => ({
  get: () =>
    new Promise((res, rej) => {
      res({})
    }),
  post: () =>
    new Promise((res, rej) => {
      res({})
    }),
}))

const AllProviders = ({ children }) => {
  return (
    <Router history={history}>{children}</Router>
    // <ThemeProvider>
    // <PuppiesProvider>{children}</PuppiesProvider>
    // </ThemeProvider>
  )
}

// Replace the defualt render function
const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from "@testing-library/react"

export { customRender as render }

export const testContextExports = (ContextProdiver, useContext, expectedExports) => {
  it("expectedExports not be an empty array", () => {
    expect(expectedExports instanceof Array).toBeTruthy()
    expect(expectedExports.length).toBeGreaterThan(0)
  })

  it("expectedExports should contain objects", () => {
    const validElements = expectedExports.map((elem) => elem instanceof Object)
    expect(validElements.every((e) => e === true)).toBeTruthy()
  })

  it('expectedExports should contain "key" key with string value', () => {
    const firstElem = expectedExports[0]

    expect(firstElem["key"]).not.toBe(undefined)
    expect(firstElem["key"].constructor === String).toBeTruthy()
  })

  it('expectedExports should contain "targetInstance" key with contructor value', () => {
    const firstElem = expectedExports[0]

    expect(firstElem["targetInstance"]).not.toBe(undefined)
    expect(firstElem["targetInstance"] instanceof Object).toBeTruthy()
  })

  it("useContext should be a function", () => {
    expect(useContext instanceof Function).toBeTruthy()
  })

  it("should render ContextProdiver with no errors", () => {
    expect(() =>
      customRender(
        <ContextProdiver>
          <p>MOCK CHILD</p>
        </ContextProdiver>
      )
    ).not.toThrow(new Error())
  })

  it("should render the children", () => {
    customRender(
      <ContextProdiver>
        <p data-testid="mockChild">MOCK CHILD</p>
      </ContextProdiver>
    )

    expect(screen.getByTestId("mockChild")).toBeInTheDocument()
    expect(screen.getByText("MOCK CHILD")).toBeInTheDocument()
  })

  test("passes correct values to children", () => {
    const MockChild = () => {
      const productExports = useContext()

      expectedExports.forEach(({ key, targetInstance }) => {
        try {
          expect(productExports[key]).not.toBe(undefined)
        } catch {
          throw new Error(
            `expected value ${productExports[key]} (at key: ${key}) NOT to be undefined`
          )
        }

        try {
          expect(productExports[key].constructor === targetInstance).toBeTruthy()
        } catch {
          throw new Error(
            `expected ${
              productExports[key]
            } (at key: ${key}) to be instance of ${targetInstance.toString()}`
          )
        }
      })

      return <p>test</p>
    }

    customRender(
      <ContextProdiver>
        <MockChild />
      </ContextProdiver>
    )
  })
}
