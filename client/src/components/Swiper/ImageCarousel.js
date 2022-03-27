import React, { useState } from "react"

const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [min, max] = [0, images.length - 1]

  const scrollImages = (indexChange) => {
    setImageIndex((prevIndex) => {
      if (indexChange < 0) {
        if (prevIndex === min) {
          return min
        } else {
          return prevIndex + indexChange
        }
      } else {
        if (prevIndex === max) {
          return max
        } else {
          return prevIndex + indexChange
        }
      }
    })
  }

  return (
    <div className="Images">
      <button onClick={() => scrollImages(-1)} disabled={imageIndex === min}>
        {"<"}
      </button>

      <img src={images[imageIndex]} />

      <button onClick={() => scrollImages(1)} disabled={imageIndex === max}>
        {">"}
      </button>
    </div>
  )
}

export default ImageCarousel
