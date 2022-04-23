import React from "react"
import { render, screen, fireEvent, within } from "utils/test-utils"
import { act } from "@testing-library/react"
import Tabs from "./Tabs"

const mockTabs = [
  {
    value: "firstTab",
    title: "FirstTab",
  },
  {
    value: "secondTab",
    title: "SecondTab",
  },
]
describe("Tabs", () => {
  const defaultProps = {
    tabs: mockTabs,
    currentTab: "firstTab",
    setCurrentTab: jest.fn(),
  }

  test("should render without throwing an error", () => {
    render(<Tabs {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("should render three tabs", () => {
    render(<Tabs {...defaultProps} />)
    const list = screen.getByRole("list")
    const { getAllByRole } = within(list)

    const items = getAllByRole("listitem")
    expect(items.length).toBe(mockTabs.length)
  })
})
