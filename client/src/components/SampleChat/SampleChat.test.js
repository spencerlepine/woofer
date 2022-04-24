import React from "react"
import { render, screen } from "utils/test-utils"
import SampleChat from "./SampleChat"

describe("SampleChat", () => {
  test("should render without throwing an error", () => {
    render(<SampleChat />)
    expect(true).toBeTruthy()
  })
})
