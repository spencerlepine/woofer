import React from "react"
import { render, screen } from "utils/test-utils"
import ChatList from "./ChatList"

describe("ChatList", () => {
  test("should render without throwing an error", () => {
    render(<ChatList />)
    expect(true).toBeTruthy()
  })
})
