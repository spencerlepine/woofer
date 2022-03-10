import React from "react"
import { render, screen } from "utils/test-utils"
import ExampleButton from "./ExampleButton"

describe("Example Button", () => {
  test("renders a hello button", () => {
    render(<ExampleButton />)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent("Say Hello")
  })
})
