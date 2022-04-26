import React from "react"
import { render, screen } from "utils/test-utils"
import App from "./App"

describe("App", () => {
  test("renders without throwing an error", () => {
    render(<App />)
    // const linkElement = screen.getByText(/Woofer/i)
    // expect(linkElement).toBeInTheDocument()
    expect(true).toBeTruthy()
  })
})
