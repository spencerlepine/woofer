import React from "react"
import { screen, render as rltRender } from "utils/test-utils"
import useAuthRedirect from "./useAuthRedirect"
import { AuthContext } from "context/AuthContext/AuthContext"
import currentUser from "currentUser"

const render = (ui, contextValue = {}) => {
  const defualtValues = {}
  return rltRender(
    <AuthContext.Provider value={{ ...defualtValues, ...contextValue }}>
      {ui}
    </AuthContext.Provider>
  )
}

describe("useAuthRedirect", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const mockChild = () => <p>CHILD</p>

  test("renders HOME redirect with Valid CurrentUser and true isAuthPage arguments", () => {
    // import { Redirect } from 'react-router-dom'; => doesn't render
    const WrappedComponent = useAuthRedirect(mockChild, true)

    render(<WrappedComponent />, { currentUser })
    expect(screen.queryByText("CHILD")).toBeNull()
  })

  test("renders child with Valid CurrentUser and false isAuthPage arguments", () => {
    const WrappedComponent = useAuthRedirect(mockChild, false)

    render(<WrappedComponent />, { currentUser })

    expect(screen.getByText("CHILD")).toBeInTheDocument()
  })

  test("renders child with Invalid CurrentUser and true isAuthPage arguments", () => {
    const WrappedComponent = useAuthRedirect(mockChild, true)

    render(<WrappedComponent />, null)

    expect(screen.getByText("CHILD")).toBeInTheDocument()
  })

  test("renders WELCOME redirect with Invalid CurrentUser and false isAuthPage arguments", () => {
    const WrappedComponent = useAuthRedirect(mockChild, false)

    render(<WrappedComponent />, null)

    expect(screen.queryByText("CHILD")).toBeNull()
  })
})
