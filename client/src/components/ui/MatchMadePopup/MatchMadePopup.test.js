import React from "react"
import { render, screen, fireEvent } from "utils/test-utils"
import MatchMadePopup from "./MatchMadePopup"

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
    const testProps = new Object(defaultProps)
    testProps["renderMe"] = false

    const { container } = render(<MatchMadePopup {...testProps} />)
    expect(container.firstChild).toBeNull()
  })

  test("should render given true renderMe prop", () => {
    const testProps = new Object(defaultProps)
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
    const testProps = new Object(defaultProps)
    testProps["renderMe"] = true

    const { getByAltText } = render(<MatchMadePopup {...testProps} />)

    const nameElement = screen.getByText(/John Doe/i)
    expect(nameElement).toBeInTheDocument()

    const ageElement = screen.getByText(/y\/o/i)
    expect(ageElement).toBeInTheDocument()

    const zodiacElement = screen.getByText(new RegExp(`/${mockZodiac}/`, "i"))
    expect(zodiacElement).toBeInTheDocument()

    getByAltText("Profile Picture")
  })

  test("should render View Later button", () => {
    const testProps = new Object(defaultProps)
    testProps["renderMe"] = true

    render(<MatchMadePopup {...testProps} />)
    const laterButton = screen.getByRole("button")
    expect(laterButton).toBeInTheDocument()
  })

  test("should close popup after clicking View Later button", () => {
    const testProps = new Object(defaultProps)
    testProps["renderMe"] = true

    const { container } = render(<MatchMadePopup {...testProps} />)
    const laterButton = screen.getByRole("button")
    fireEvent.click(laterButton)
    expect(container.firstChild).toBeNull()
  })

  test("should render Open Chat Link", () => {
    const testProps = new Object(defaultProps)
    testProps["renderMe"] = true

    render(<MatchMadePopup {...testProps} />)
    const chatLink = screen.getByRole("link")
    expect(chatLink).toBeInTheDocument()
    expect(chatLink).toHaveAttribute("href")
  })
})
