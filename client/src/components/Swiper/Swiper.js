import React, { useState } from "react"
import ImageCarousel from "./ImageCarousel"
import { postUserSwipe } from "api/matches"
import constants from "config/constants"
const { DATA_KEYS } = constants
const yesSwipe = DATA_KEYS["MATCH_ACCEPT"]
const noSwipe = DATA_KEYS["MATCH_REJECT"]
const idKey = DATA_KEYS["USER_ID"]

const Swiper = ({ images, possibleMatchUser, thisUser }) => {
  const thisUserId = thisUser[idKey]
  const thatUserId = possibleMatchUser[idKey]

  const handleSwipe = (thisUserId, thatUserId, swipe) => {
    const body = {
      [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
      [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
      [DATA_KEYS["MATCH_STATUS"]]: swipe,
    }

    postUserSwipe(body, ({ chatId, userProfile }) => {
      console.log(chatId, userProfile)
      console.log("'TODO SWIPER'")
    })
  }

  return (
    <div className="Swiper">
      <div>
        <button onClick={() => handleSwipe(thisUserId, thatUserId, yesSwipe)}>
          YES
        </button>

        <button onClick={() => handleSwipe(thisUserId, thatUserId, noSwipe)}>
          NO
        </button>
      </div>

      <ImageCarousel images={images} />
    </div>
  )
}

export default Swiper
