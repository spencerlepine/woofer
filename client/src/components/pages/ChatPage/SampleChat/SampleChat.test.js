import React from "react"
import { render, screen } from "utils/test-utils"
import SampleChat from "./SampleChat"

describe("SampleChat", () => {
  test("should render without throwing an error", () => {
    render(<SampleChat />)
    expect(true).toBeTruthy()
  })

  test("should render send button", () => {
    render(<SampleChat />)
    const sendBtn = screen.getByText(/Send/i)
    expect(sendBtn).toBeInTheDocument()
  })

  test("should render message input", () => {
    render(<SampleChat />)
    const messageInput = screen.getByRole("textbox")
    expect(messageInput).toBeInTheDocument()
  })
})
