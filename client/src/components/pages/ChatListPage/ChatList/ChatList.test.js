import React from "react"
import { render, screen } from "utils/test-utils"
import ChatListCompnent from "./ChatList"

const ChatList = (props) => (
  <AuthProvider>
    <ChatListCompnent {...props} />
  </AuthProvider>
)

describe("ChatList", () => {
  test("should render without throwing an error", () => {
    render(<ChatList />)
    expect(true).toBeTruthy()
  })
})
