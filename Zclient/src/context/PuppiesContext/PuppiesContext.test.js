import React from "react"
import { render, screen, act } from "utils/test-utils"
import usePuppies, { PuppiesContext } from "./PuppiesContext"

describe("PuppiesContext", () => {
  test("passes correct values to children", () => {
    const MockChild = () => {
      const productExports = usePuppies()

      expectedExports.forEach(({ key, targetInstance }) => {
        try {
          expect(productExports[key]).not.toBe(undefined)
        } catch {
          throw new Error(`expected ${key} to NOT be undefined`)
        }
        try {
          const matchesConstructor =
            productExports[key] instanceof targetInstance ||
            productExports[key].constructor === targetInstance
          expect(matchesConstructor).toBeTruthy()
        } catch {
          throw new Error(`expected ${key} to be instance of ${targetInstance}`)
        }
      })

      return <p>test</p>
    }

    render(<MockChild />)
  })
})

const expectedExports = [
  {
    key: "puppiesList",
    targetInstance: Array,
  },
  {
    key: "loading",
    targetInstance: Boolean,
  },
  {
    key: "addPuppyToList",
    targetInstance: Function,
  },
]
