import React from "react"
import { render, screen, fireEvent, within } from "utils/test-utils"
import { act } from "@testing-library/react"
import AccountForm from "./AccountForm"

describe("AccountForm", () => {
  const defaultProps = {
    CorrectionFormLink: "/signup",
    FormFields: [],
    WrongFormLabel: "Don't Have an Account?",
    CorrectionFormName: "Sign Up",
    SubmitLabel: "Submit",
    FormTitle: "Mock Account Form",
    handleSubmit: jest.fn(),
  }

  test("should render without throwing an error", () => {
    render(<AccountForm {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("should render the woofer logo", () => {
    render(<AccountForm {...defaultProps} />)
    const logoElem = screen.getByAltText("Woofer Logo")
    expect(logoElem).toBeInTheDocument()
  })

  test("should render the form title", () => {
    render(<AccountForm {...defaultProps} />)
    const titleElem = screen.getByText(defaultProps["FormTitle"])
    expect(titleElem).toBeInTheDocument()
  })

  test("should render the submit button", () => {
    render(<AccountForm {...defaultProps} />)
    const submitBtn = screen.getByRole("button")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveTextContent(defaultProps["SubmitLabel"])
  })

  test("should invoke handleSubmit prop when clicking submit button", (done) => {
    const submitProps = {
      ...defaultProps,
      handleSubmit: jest.fn(),
    }

    render(<AccountForm {...submitProps} />)
    const submitBtn = screen.getByRole("button")

    act(() => {
      fireEvent.click(submitBtn)
      expect(submitProps.handleSubmit.mock.calls.length).toBe(1)
      done()
    })
  })

  // test("should render update button", () => {
  //   render(<AccountForm {...defaultProps} />)

  //   const updateBtn = screen.getByText(/Update/i)
  //   expect(updateBtn).toBeInTheDocument()
  // })

  // test("should pass down controlled form props", () => {
  //   const expectedProps = {
  //     updateAccountDetails: "function",
  //     accountDetails: "object",
  //     currentUser: "object",
  //     formEntries: "object",
  //     setFormEntries: "function",
  //     handleSubmit: "function",
  //     handleChange: "function",
  //     madeChange: "boolean",
  //     setMadeChange: "function",
  //     manualSubmit: "function"
  //   }

  //   const MockFields = (props) => (
  //     <ul>
  //       {Object.keys(props).map((propKey, i) => (
  //         <li data-testid={propKey} key={i}>
  //           {typeof props[propKey]}
  //         </li>
  //       ))}
  //     </ul>
  //   )

  //   render(<AccountForm FieldsComponent={MockFields} />)

  //   Object.keys(expectedProps).forEach((propKey) => {
  //     const propType = expectedProps[propKey]

  //     const propItem = screen.getByTestId(propKey)
  //     expect(propItem).toBeInTheDocument()
  //     expect(propItem).toHaveTextContent(propType)
  //   })
  // })
})
