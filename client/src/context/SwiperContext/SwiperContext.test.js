import useSwiper, { SwiperProvider } from "./SwiperContext"
import { testContextExports } from "utils/test-utils"

describe("SwiperContext", () => {
  const expectedExports = [
    {
      key: "swiperUserLoading",
      targetInstance: Boolean,
    },
    {
      key: "swiperButtonLoading",
      targetInstance: Boolean,
    },
    {
      key: "handleSwipe",
      targetInstance: Function,
    },
    // {
    //   key: "possibleMatchUser",
    //   targetInstance: Function,
    // },
    {
      key: "generateNextMatchUser",
      targetInstance: Function,
    },
  ]

  testContextExports(SwiperProvider, useSwiper, expectedExports)
})
