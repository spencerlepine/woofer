import useChats, { ChatsProvider } from "./ChatsContext"
import { testContextExports } from "utils/test-utils"

describe("ChatsContext", () => {
  const expectedExports = [
    {
      key: "availableChats",
      targetInstance: Array,
    },
    {
      key: "fetchUserChats",
      targetInstance: Function,
    },
  ]

  testContextExports(ChatsProvider, useChats, expectedExports)
})
