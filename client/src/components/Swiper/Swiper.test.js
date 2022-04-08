import React from "react"
import { render, screen, fireEvent } from "utils/test-utils"
import { act } from "@testing-library/react"
import Swiper from "./Swiper"

describe("Swiper", () => {
  test("should render without throwing an error", () => {
    render(<Swiper />)
    expect(true).toBeTruthy()
  })

  // describe("When NOT Logged in", () => {
  //   test("should render log in link when not logged in", () => {
  //     render(<Swiper />)
  //     const logInBtn = screen.getByText("LOG IN")
  //     expect(logInBtn).toBeInTheDocument()
  //   })
  // })

  describe("When Logged in", () => {
    beforeEach(() => {
      render(<Swiper />)
    })

    test("should not render log in link when logged in", () => {
      render(<Swiper />)
      expect(screen.queryByText("LOG IN")).toBeNull()
    })

    test("should render 'Try Again' button when missing possible match", () => {
      const refreshBtn = screen.getByRole("button", {
        name: /Try Again/i,
      })
      expect(refreshBtn).toBeInTheDocument()
    })

    test("should render loading indicator when loading", (done) => {
      const refreshBtn = screen.getByRole("button", {
        name: /Try Again/i,
      })

      act(() => {
        fireEvent.click(refreshBtn)
      })
      console.log(screen.debug())
      const loadingIndicator = screen.getByText(/Loading/i)
      expect(loadingIndicator).toBeInTheDocument()
      done()
    })
  })
})
