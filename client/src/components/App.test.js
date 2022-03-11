import React from "react"
import { render, screen } from "utils/test-utils"
import App from "./App"

describe("App", () => {
  test("renders learn react link", () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
  })
})
