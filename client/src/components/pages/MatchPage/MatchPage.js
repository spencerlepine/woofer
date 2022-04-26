import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import MatchModal from "./MatchModal"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"
import { fetchProfileRecord } from "api/account"

import { BiError } from "react-icons/bi"

const MatchPage = () => {
  const params = useParams()
  const { userId, chatId } = params

  const { matchMadeUser } = useSwiper()
  const [userInfo, setUserInfo] = useState(matchMadeUser)

  useEffect(() => {
    if (!userInfo) {
      fetchProfileRecord(userId, (userProfile) => {
        setUserInfo(userProfile)
      })
    }
  }, [])

  return (
    <div className="hero-body general-settings">
      <div className="container">
        <div className="profile">
          <h2 className="title is-2">Match Made!</h2>

          {userInfo ? (
            <MatchModal user={userInfo} chatId={chatId} />
          ) : (
            <div className="hero-body general-settings">
              <div className="container">
                <div className="MissingPage section">
                  <BiError className="icon is-large is-danger" />
                  <p>No User Found</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const WrappedMatch = (props) => (
  <SwiperProvider>
    <MatchPage {...props} />
  </SwiperProvider>
)
const isAuthPage = false
export default withAuthRedirect(WrappedMatch, isAuthPage)
