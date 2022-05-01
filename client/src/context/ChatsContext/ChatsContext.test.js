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
    {
      key: "otherUserDetails",
      targetInstance: Object,
    },
    {
      key: "fetchOtherUserDetails",
      targetInstance: Function,
    },
  ]

  testContextExports(ChatsProvider, useChats, expectedExports)
})
