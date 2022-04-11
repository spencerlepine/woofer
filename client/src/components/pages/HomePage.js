import React from "react"
import Swiper from "components/Swiper/Swiper"
import SampleChat from "components/SampleChat/SampleChat"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const images = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
  "https://image.shutterstock.com/image-photo/little-fat-pug-sitting-on-260nw-206851003.jpg",
]

const HomePage = () => (
  <div className="HomePage">
    <Swiper />
    {/* TODO  - DELETE THIS*/}
    <SampleChat />
  </div>
)

const isAuthPage = false
export default withAuthRedirect(HomePage, isAuthPage)
