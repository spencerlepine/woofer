import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaRedoAlt } from "react-icons/fa"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

import SwipeButtons from "./SwipeButtons/SwipeButtons"
import ImageCarousel from "./ImageCarousel/ImageCarousel"
import UserInfo from "./UserInfo/UserInfo"

import * as ROUTES from "config/routeConstants"
import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

const userSample = {
  bio: "I love dog treats bork woof",
  birthday: "03/01/2003",
  breed: "corgi",
  chats: [],
  email: "ashtyn.ruiz116@gmail.com",
  firstName: "Ashtyn",
  gender: "Female",
  id: "qIpINEMnazRkeqp6IsvNp2KlOfy2",
  lastName: "Ruiz",
  name: "john1234",
  pictures: [
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_11037.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_11334.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_11741.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1612.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_4591.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_4628.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_6775.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_748.jpg",
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_9902.jpg",
  ],
  preference: "Male",
  profile_picture:
    "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_11037.jpg",
  zipcodes: ["10001"],
  zodiac_sign: "Leo",
}

const extractUserImages = (userObj) => {
  const imageKey = DATA_KEYS["USER_PICTURES"]
  try {
    const images = userObj[DATA_KEYS["USER_PICTURES"]]
    return images
  } catch (e) {
    return []
  }
}

const Swiper = () => {
  const { currentUser: thisUser, accountDetails } = useAuth()
  const {
    swiperUserLoading: loading,
    // possibleMatchUser,
    generateNextMatchUser,
  } = useSwiper()
  const possibleMatchUser = userSample // DELETE

  const [firstGenerate, setFirstGenerate] = useState(false)

  useEffect(() => {
    if (thisUser && firstGenerate === false) {
      generateNextMatchUser(thisUser[idKey] || thisUser["uid"])

      setFirstGenerate(true)
    }
  }, [thisUser, firstGenerate])

  const images = extractUserImages(possibleMatchUser)

  const RenderInfoOrRetry = () => (
    <>
      {possibleMatchUser ? (
        <>
          <div className="card">
            <SwipeButtons thisUser={thisUser} thatUser={possibleMatchUser} />

            <ImageCarousel images={images} />

            <UserInfo user={possibleMatchUser} />
          </div>
        </>
      ) : (
        <>
          <section className="section">
            <div className="card">
              <header className="card-header">
                <h2 className="card-header-title is-centered">
                  Unable to find possible match...
                </h2>
              </header>
              <div className="card-content">
                <div className="content">
                  <button
                    className="button is-danger"
                    onClick={() =>
                      generateNextMatchUser(thisUser[idKey] || thisUser["uid"])
                    }
                  >
                    <FaRedoAlt />
                    <p className="px-1">Try Again</p>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )

  const InfoOrLogInPrompt = () => (
    <>
      {thisUser ? (
        <RenderInfoOrRetry />
      ) : (
        <>
          <h4>Sign in to continue</h4>
          <Link to={ROUTES.LOGIN}>LOG IN</Link>
        </>
      )}
    </>
  )

  return (
    <div className="swiper">
      <div className="columns is-centered">
        <div className="column is-half">
          {loading ? (
            <p>Loading... {/*TODO - LOADING SPINNER*/}</p>
          ) : (
            <InfoOrLogInPrompt />
          )}
        </div>
      </div>
    </div>
  )
}

const WrappedSwiper = (props) => (
  <AuthProvider>
    <SwiperProvider>
      <Swiper {...props} />
    </SwiperProvider>
  </AuthProvider>
)

export default WrappedSwiper
