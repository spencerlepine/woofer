import React from "react"
import {
  render,
  screen,
  // fireEvent,
} from "utils/test-utils"
import SwipeButtons from "./SwipeButtons"
import mockUser from "mockUser"

describe("SwipeButtons", () => {
  const defaultProps = {
    thisUser: mockUser,
    thatUser: mockUser,
  }

  test("renders without throwing an error", () => {
    render(<SwipeButtons {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("should render YES/NO buttons", () => {
    render(<SwipeButtons {...defaultProps} />)

    const yesButton = screen.getByRole("button", {
      name: /YES/i,
    })
    expect(yesButton).toBeInTheDocument()
    const noButton = screen.getByRole("button", {
      name: /NO/i,
    })
    expect(noButton).toBeInTheDocument()
  })
})
