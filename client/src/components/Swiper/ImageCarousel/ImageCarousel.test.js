import React from "react"
import { render, screen, fireEvent } from "utils/test-utils"
import ImageCarousel from "./ImageCarousel"

const mockImages = [
  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
  "https://en.wikipedia.org/wiki/File:Stack_Overflow_logo.svg",
]

const getSliderButton = (screen, sliderDirection) => {
  if (sliderDirection.toLowerCase() === "left") {
    return screen.getByRole("button", {
      name: /</i,
    })
  } else {
    return screen.getByRole("button", {
      name: />/i,
    })
  }
}
const getBothSliderBtns = (screen) => {
  return [getSliderButton(screen, "left"), getSliderButton(screen, "right")]
}

describe("ImageCarousel", () => {
  const defaultProps = {
    images: mockImages,
  }

  test("renders without throwing an error", () => {
    render(<ImageCarousel {...defaultProps} />)
    expect(true).toBeTruthy()
  })

  test("renders one image element", () => {
    const { getByAltText } = render(<ImageCarousel {...defaultProps} />)
    const imageElem = getByAltText("Matchable User")
    expect(imageElem).toHaveAttribute("src")
  })

  test("should render first image in list by default", () => {
    const { getByAltText } = render(<ImageCarousel {...defaultProps} />)
    const imageElem = getByAltText("Matchable User")
    const expectedImageSrc = mockImages[0]
    expect(imageElem).toHaveAttribute("src", expectedImageSrc)
  })

  test("should render placeholder image when given empty prop", () => {
    const { getByAltText } = render(<ImageCarousel images={[]} />)
    const imageElem = getByAltText("Matchable User")
    expect(imageElem).toHaveAttribute("src")
  })

  test("should render placeholder image when given invalid image sources", () => {
    const invalidImages = [999, 999]
    const { getByAltText } = render(<ImageCarousel images={invalidImages} />)
    const imageElem = getByAltText("Matchable User")
    expect(imageElem).toHaveAttribute("src")
  })

  test("renders left/right slider buttons", () => {
    render(<ImageCarousel {...defaultProps} />)
    const [leftBtn, rightBtn] = getBothSliderBtns(screen)

    expect(leftBtn).toBeInTheDocument()
    expect(rightBtn).toBeInTheDocument()
  })

  test("should disable slider buttons when given one image", () => {
    render(<ImageCarousel {...defaultProps} />)
    const [leftBtn, rightBtn] = getBothSliderBtns(screen)
    expect(leftBtn.getAttribute("disabled")).toBeDefined()
    expect(rightBtn.getAttribute("disabled")).toBeDefined()
  })

  test("should disable LEFT slider button when displaying first image", () => {
    render(<ImageCarousel {...defaultProps} />)
    const [leftBtn, rightBtn] = getBothSliderBtns(screen)
    expect(leftBtn.getAttribute("disabled")).not.toBe(null)
    expect(rightBtn.getAttribute("disabled")).toBe(null)
  })

  test("should disable RIGHT slider button when displaying last image", () => {
    render(<ImageCarousel {...defaultProps} />)
    const [leftBtn, rightBtn] = getBothSliderBtns(screen)

    // act
    const timesToScroll = defaultProps.images.length - 1
    for (let i = 0; i < timesToScroll; i += 1) {
      fireEvent.click(rightBtn)
    }

    // assert
    expect(leftBtn.getAttribute("disabled")).toBe(null)
    expect(rightBtn.getAttribute("disabled")).not.toBe(null)
  })

  test("should enable both slider buttons when displaying middle image", () => {
    render(<ImageCarousel {...defaultProps} />)
    const [leftBtn, rightBtn] = getBothSliderBtns(screen)

    // Given 3 images, render the middle one
    fireEvent.click(rightBtn)

    expect(leftBtn.getAttribute("disabled")).toBe(null)
    expect(rightBtn.getAttribute("disabled")).toBe(null)
  })

  test("should scroll images left and right in order", () => {
    const { getByAltText } = render(<ImageCarousel {...defaultProps} />)
    const [leftBtn, rightBtn] = getBothSliderBtns(screen)

    const timesToScroll = defaultProps.images.length - 1

    // Scroll right until the end
    for (let r = 0; r < timesToScroll; r += 1) {
      const currentImg = getByAltText("Matchable User")
      const imageSrc = currentImg.getAttribute("src")
      expect(imageSrc).toBe(mockImages[r])

      fireEvent.click(rightBtn)
    }

    // Scroll left until the start
    for (let l = timesToScroll; l >= 0; l -= 1) {
      const currentImg = getByAltText("Matchable User")
      const imageSrc = currentImg.getAttribute("src")
      expect(imageSrc).toBe(mockImages[l])

      fireEvent.click(leftBtn)
    }
  })
})
