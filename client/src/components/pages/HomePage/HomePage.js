import React from "react"
import Swiper from "./Swiper/Swiper"
import MissingInfoWarning from "./MissingInfoWarning/MissingInfoWarning"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const HomePage = () => (
  <div className="HomePage">
    <MissingInfoWarning />
    <Swiper />
  </div>
)

const isAuthPage = false
export default withAuthRedirect(HomePage, isAuthPage)
