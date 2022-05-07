import React from "react"
import { render, screen, fireEvent } from "utils/test-utils"
import MatchMadePopup from "./MatchMadePopup"
import mockUser from "mockUser"

describe("MatchMadePopup", () => {
  const defaultProps = {
    user: mockUser,
    chatId: "12345",
    closePopup: jest.fn(),
    renderMe: false,
  }

  test("renders without throwing an error", () => {
    render(<MatchMadePopup {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("should not render given false renderMe prop", () => {
    const testProps = Object.create(defaultProps)
    testProps["renderMe"] = false

    const checkForPopup = () => {
      screen.getByText(/Match Made!/i)
    }
    expect(checkForPopup).toThrow()
  })

  test("should render given true renderMe prop", () => {
    const testProps = Object.create(defaultProps)
    testProps["renderMe"] = true

    const { container } = render(<MatchMadePopup {...testProps} />)
    expect(container.firstChild).not.toBeNull()
  })

  test("should render Match Made! message", () => {
    render(<MatchMadePopup {...defaultProps} />)
    const titleElement = screen.getByText(/Match Made!/i)
    expect(titleElement).toBeInTheDocument()
  })

  test("should render user profile info", () => {
    const testProps = Object.create(defaultProps)
    testProps["renderMe"] = true

    const { getByAltText } = render(<MatchMadePopup {...testProps} />)

    const nameElement = screen.getByText(/John Doe/i)
    expect(nameElement).toBeInTheDocument()

    const ageElement = screen.getByText(/y\/o/i)
    expect(ageElement).toBeInTheDocument()

    const mockZodiac = mockUser["zodiac"]
    const zodiacElement = screen.getByText(new RegExp(`${mockZodiac}`, "i"))
    expect(zodiacElement).toBeInTheDocument()

    getByAltText("Profile Picture")
  })

  test("should render View Later button", () => {
    const testProps = Object.create(defaultProps)
    testProps["renderMe"] = true

    render(<MatchMadePopup {...testProps} />)
    const laterButton = screen.getByRole("button", {
      name: /View Later/i,
    })
    expect(laterButton).toBeInTheDocument()
  })

  test("should close popup after clicking View Later button", () => {
    const testProps = Object.create(defaultProps)
    testProps["renderMe"] = true
    testProps["closePopup"] = jest.fn()

    render(<MatchMadePopup {...testProps} />)
    const laterButton = screen.getByRole("button", {
      name: /View Later/i,
    })
    fireEvent.click(laterButton)
    const closeFn = testProps["closePopup"]
    expect(closeFn.mock.calls.length).toBe(1)
  })

  test("should render Open Chat Link", () => {
    const testProps = Object.create(defaultProps)
    testProps["renderMe"] = true

    render(<MatchMadePopup {...testProps} />)
    const chatLink = screen.getByRole("link", {
      name: /Open Chat/i,
    })
    expect(chatLink).toBeInTheDocument()
    expect(chatLink).toHaveAttribute("href")
  })
})
