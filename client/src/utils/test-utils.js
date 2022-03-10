import React from "react"
import { render } from "@testing-library/react"
import { PuppiesProvider } from "context/PuppiesContext/PuppiesContext"
import "@testing-library/jest-dom"

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
    // <ThemeProvider>
    <PuppiesProvider>{children}</PuppiesProvider>
    // </ThemeProvider>
  )
}

// Replace the defualt render function
const customRender = (ui, options) => {
  render(ui, { wrapper: AllProviders, ...options })
}

export * from "@testing-library/react"

export { customRender as render }
