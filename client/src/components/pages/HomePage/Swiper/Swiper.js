import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaRedoAlt } from "react-icons/fa"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

import SwipeButtons from "./SwipeButtons/SwipeButtons"
import ImageCarousel from "./ImageCarousel/ImageCarousel"
import UserInfo from "components/ui/UserInfo/UserInfo"

import * as ROUTES from "config/routeConstants"
const idKey = "userId"

const extractUserImages = (userObj) => {
  const imageKey = "pictures"
  try {
    const images = userObj[imageKey]
    return images
  } catch (e) {
    return []
  }
}

const Swiper = () => {
  const { currentUser: thisUser, accountDetails } = useAuth()
  const {
    swiperUserLoading: loading,
    possibleMatchUser,
    generateNextMatchUser,
  } = useSwiper()

  const [firstGenerate, setFirstGenerate] = useState(false)

  useEffect(() => {
    if (thisUser && firstGenerate === false) {
      generateNextMatchUser(thisUser[idKey] || thisUser["uid"])

      setFirstGenerate(true)
    }
  }, [thisUser, firstGenerate])

  const images = extractUserImages(possibleMatchUser)

  const GenerationFailed = () => (
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
  )

  return (
    <div className="swiper container m-4">
      <div className="columns is-centered">
        <div className="column is-half">
          {loading ? (
            <div className="section is-vcentered">
              <div className="columns  is-flex is-vcentered">
                <div className="column is-6 mx-auto">
                  <h2 className="title is-2">
                    <div className="loader-wrapper mx-auto">
                      <div className="loader is-loading mx-auto"></div>
                    </div>
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <>
              {thisUser ? (
                <>
                  {possibleMatchUser ? (
                    <>
                      <div className="card">
                        <SwipeButtons
                          thisUser={thisUser}
                          thatUser={possibleMatchUser}
                        />

                        <ImageCarousel images={images} />

                        <UserInfo user={possibleMatchUser} />
                      </div>
                    </>
                  ) : (
                    <GenerationFailed />
                  )}
                </>
              ) : (
                <>
                  <h4>Sign in to continue</h4>
                  <Link to={ROUTES.LOGIN}>LOG IN</Link>
                </>
              )}
            </>
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
