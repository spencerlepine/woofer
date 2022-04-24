import React from "react"
import { render, screen, fireEvent, within } from "utils/test-utils"
import { act } from "@testing-library/react"
import AccountFormWrapper from "./AccountFormWrapper"

describe("AccountFormWrapper", () => {
  const defaultProps = {
    FieldsComponent: () => <></>,
  }

  test("should render without throwing an error", () => {
    render(<AccountFormWrapper {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("should render update button", () => {
    render(<AccountFormWrapper {...defaultProps} />)

    const updateBtn = screen.getByText(/Update/i)
    expect(updateBtn).toBeInTheDocument()
  })

  test("should pass down controlled form props", () => {
    const expectedProps = {
      updateAccountDetails: "function",
      accountDetails: "object",
      currentUser: "object",
      formEntries: "object",
      setFormEntries: "function",
      handleSubmit: "function",
      handleChange: "function",
      madeChange: "boolean",
      setMadeChange: "function",
      manualSubmit: "function",
    }

    const MockFields = (props) => (
      <ul>
        {Object.keys(props).map((propKey, i) => (
          <li data-testid={propKey} key={i}>
            {typeof props[propKey]}
          </li>
        ))}
      </ul>
    )

    render(<AccountFormWrapper FieldsComponent={MockFields} />)

    Object.keys(expectedProps).forEach((propKey) => {
      const propType = expectedProps[propKey]

      const propItem = screen.getByTestId(propKey)
      expect(propItem).toBeInTheDocument()
      expect(propItem).toHaveTextContent(propType)
    })
  })
})
