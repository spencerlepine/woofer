import React from "react"
import { render, screen } from "utils/test-utils"
import PreferenceTab from "./PreferenceTab"

describe("PreferenceTab", () => {
  test("should render without throwing an error", () => {
    render(<PreferenceTab />)
    expect(true).toBeTruthy()
  })
})
