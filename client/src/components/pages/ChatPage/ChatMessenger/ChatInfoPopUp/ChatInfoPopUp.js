import React from "react"
import UserInfo from "components/ui/UserInfo/UserInfo"
import * as ROUTES from "config/routeConstants"
import * as chatsAPI from "api/chats"
import * as matchesAPI from "api/matches"
import { useHistory } from "react-router-dom"

const ChatInfoPopUp = ({
  chatId,
  userId,
  otherUserId,
  otherUserDetails,
  closePopup,
}) => {
  const history = useHistory()

  const handleChatDelete = () => {
    chatsAPI.removeUserFromChat(userId, otherUserId, chatId, () => {
      history.push(ROUTES.HOME)
    })
  }

  const handleBlock = () => {
    chatsAPI.removeUserFromChat(userId, otherUserId, chatId, () => {})
    const body = {
      thisUserId: userId,
      thatUserId: otherUserId,
      matchStatus: "reject",
    }

    matchesAPI.postUserSwipe(body, () => {
      history.push(ROUTES.HOME)
    })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content has-background-white box">
        <button className="button is-warning" onClick={handleBlock}>
          BLOCK USER
        </button>

        <button className="button is-danger" onClick={handleChatDelete}>
          DELETE CHAT
        </button>

        <br />
        <p>
          Chat ID: <span className="has-text-info">{chatId}</span>
        </p>

        <UserInfo user={otherUserDetails} />
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closePopup}
      ></button>
    </div>
  )
}

export default ChatInfoPopUp
