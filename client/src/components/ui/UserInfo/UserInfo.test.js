import React from "react"
import { render, screen, fireEvent } from "utils/test-utils"
import { titleCaseDisplayName, formatAgeStr } from "utils"

import UserInfo from "./UserInfo"
import mockUser from "mockUser"

const { firstName, lastName } = mockUser
const mockDisplayName = titleCaseDisplayName(firstName, lastName)

const expectedUserDetails = [
  mockUser["breed"],
  mockUser["zodiac"],
  formatAgeStr(mockUser["birthday"]),
]

describe("UserInfo", () => {
  const defaultProps = {
    user: mockUser,
  }

  test("renders without throwing an error", () => {
    render(<UserInfo {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("should render dog display name", () => {
    render(<UserInfo {...defaultProps} />)

    const displayNameElem = screen.getByText(mockDisplayName)
    expect(displayNameElem).toBeInTheDocument()
  })

  test("should render bio, zodiac, breed, and age", () => {
    render(<UserInfo {...defaultProps} />)

    expectedUserDetails.forEach((textValue) => {
      expect(screen.getByText(textValue)).toBeInTheDocument()
    })
  })

  // test("should render a collapse button for profile details", () => {
  //   render(<UserInfo {...defaultProps} />)

  //   const collapseButton = screen.getByRole("button")
  //   expect(collapseButton).toBeInTheDocument()
  // })

  // test("should collapse profile details when clicking button", () => {
  //   render(<UserInfo {...defaultProps} />)

  //   // find collapse button
  //   const collapseButton = screen.getByRole("button")
  //   fireEvent.click(collapseButton)

  //   // should find name still
  //   const displayNameElem = screen.getByText(mockDisplayName)
  //   expect(displayNameElem).toBeInTheDocument()

  //   // should not find bio, age, zodiac
  //   expectedUserDetails.forEach((textValue) => {
  //     expect(screen.queryByText(textValue)).toBeNull()
  //   })
  // })

  // test("should uncollapse profile details when clicking button twice", () => {
  //   render(<UserInfo {...defaultProps} />)

  //   // find collapse button
  //   const collapseButton = screen.getByRole("button")
  //   fireEvent.click(collapseButton) // close
  //   fireEvent.click(collapseButton) // open

  //   // should find bio, age, zodiac
  //   expectedUserDetails.forEach((textValue) => {
  //     expect(screen.getByText(textValue)).toBeInTheDocument()
  //   })
  // })
})
