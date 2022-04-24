import React from "react"
import Swiper from "./Swiper/Swiper"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const HomePage = () => (
  <div className="HomePage">
    <Swiper />
  </div>
)

const isAuthPage = false
export default withAuthRedirect(HomePage, isAuthPage)
