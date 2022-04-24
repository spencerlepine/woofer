import React from "react"
import { render, screen } from "utils/test-utils"
import ImagesTab from "./ImagesTab"

describe("ImagesTab", () => {
  test("should render without throwing an error", () => {
    render(<ImagesTab />)
    expect(true).toBeTruthy()
  })
})
