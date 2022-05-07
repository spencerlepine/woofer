import React, { useState } from "react"
import PropTypes from "prop-types"

const missingImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"

const ImageCarousel = ({ images: imagesProp }) => {
  const images = imagesProp.map((imageSrc) => {
    if (typeof imageSrc === "string") {
      return imageSrc
    }
    return missingImage
  })

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
    <div className="ImageCarousel card-image has-text-centered">
      <button
        className="button is-info is-pulled-left carouselImageLeft"
        onClick={() => scrollImages(-1)}
        disabled={imageIndex === min}
      >
        {"<"}
      </button>

      <img
        className="image profileImage is-inline-block"
        alt="Matchable User"
        src={images[imageIndex] || missingImage}
      />

      <button
        className="button is-info is-pulled-right carouselImageRight"
        onClick={() => scrollImages(1)}
        disabled={imageIndex === max}
      >
        {">"}
      </button>
    </div>
  )
}

export default ImageCarousel

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
}
