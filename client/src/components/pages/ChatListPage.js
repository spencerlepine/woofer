import React from "react"
import { Link } from "react-router-dom"
import SampleChat from "components/SampleChat/SampleChat"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import * as ROUTES from "config/routeConstants"

const ChatListPage = () => (
  <p>
    All Chats:
    <Link to={`${ROUTES.CHAT}?roomId=${"testRoom"}`}>Test Room</Link>
  </p>
)

const isAuthPage = false
export default withAuthRedirect(ChatListPage, isAuthPage)
