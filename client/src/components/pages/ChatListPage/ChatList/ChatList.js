import React from "react"
import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"

const ChatList = () => {
  return (
    <p>
      All Chats:
      <Link to={`${ROUTES.CHAT}?roomId=${"testRoom"}`}>Test Room</Link>
    </p>
  )
}

export default ChatList
