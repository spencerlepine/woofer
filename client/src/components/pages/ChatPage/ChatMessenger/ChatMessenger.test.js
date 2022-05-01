import React from "react"
import { render, screen } from "utils/test-utils"
import ChatMessenger from "./ChatMessenger"

describe("ChatMessenger", () => {
  test("should render without throwing an error", () => {
    render(<ChatMessenger />)
    expect(true).toBeTruthy()
  })

  test("should render send button", () => {
    render(<ChatMessenger />)
    const sendBtn = screen.getByText(/Send/i)
    expect(sendBtn).toBeInTheDocument()
  })

  test("should render message input", () => {
    render(<ChatMessenger />)
    const messageInput = screen.getByRole("textbox")
    expect(messageInput).toBeInTheDocument()
  })
})
