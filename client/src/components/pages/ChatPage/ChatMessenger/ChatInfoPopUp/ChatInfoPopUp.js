import React from "react"
import UserInfo from "components/UserInfo/UserInfo"

const ChatInfoPopUp = ({ chatId, otherUserId, otherUserDetails, closePopup }) => {
  const handleChatDelete = () => {
    // TODO chatId
  }

  const handleBlock = () => {
    // todo post reject
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
