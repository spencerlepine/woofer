import React from "react"
import { render, screen, fireEvent, within } from "utils/test-utils"
import { act } from "@testing-library/react"
import AcountFormWrapper from "./AcountFormWrapper"

describe("AcountFormWrapper", () => {
  test("should render without throwing an error", () => {
    render(<AcountFormWrapper />)
    expect(true).toBeTruthy()
  })

  // test("should render general tab active by default", () => {
  //   render(<AcountFormWrapper />)
  //   const generalTab = screen.getByText(/General/i)
  //   expect(generalTab).toBeInTheDocument()

  //   const list = screen.getByRole("list")
  //   const { getAllByRole } = within(list)

  //   const items = getAllByRole("listitem")
  //   expect(items[0]).toHaveClass("is-active")
  // })

  // test("should render images tab second", () => {
  //   render(<AcountFormWrapper />)
  //   const imagesTab = screen.getByText(/Images/i)
  //   expect(imagesTab).toBeInTheDocument()

  //   const list = screen.getByRole("list")
  //   const { getAllByRole } = within(list)

  //   const items = getAllByRole("listitem")
  //   expect(items[1]).not.toHaveClass("is-active")
  // })

  // test("should render preferences tab third", () => {
  //   render(<AcountFormWrapper />)
  //   const preferencesTab = screen.getByText(/Preferences/i)
  //   expect(preferencesTab).toBeInTheDocument()

  //   const list = screen.getByRole("list")
  //   const { getAllByRole } = within(list)

  //   const items = getAllByRole("listitem")
  //   expect(items[1]).not.toHaveClass("is-active")
  // })
})
