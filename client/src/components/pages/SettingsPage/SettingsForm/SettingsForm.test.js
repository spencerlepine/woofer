import React from "react"
import { render, screen } from "utils/test-utils"
import SettingsForm from "./SettingsForm"

describe("SettingsForm", () => {
  test("should render without throwing an error", () => {
    render(<SettingsForm />)
    expect(true).toBeTruthy()
  })
})
