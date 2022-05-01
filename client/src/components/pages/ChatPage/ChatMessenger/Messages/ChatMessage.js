import React, { useEffect, useState } from "react"

const ChatMessage = ({ message, currentUserId }) => {
  const {
    messageId,
    time,
    user: { name, userId },
    value,
  } = message

  const isOriginMessage = userId === currentUserId
  const pullDirection = `is-pulled-${isOriginMessage ? "right" : "left"}`
  const thisUserMessageColor = "is-info"
  const thatUserMessageColor = "has-background-grey-lighter"

  return (
    <div
      key={messageId}
      className=""
      style={{ display: "flow-root" }}
      title={`Sent at ${new Date(time).toLocaleTimeString()}`}
    >
      <div
        className={pullDirection}
        style={{
          padding: ".25em",
          textAlign: isOriginMessage ? "right" : "left",
          overflowWrap: "normal",
          display: "inline-grid",
        }}
      >
        <span
          className={`tag is-medium ${
            isOriginMessage ? thisUserMessageColor : thatUserMessageColor
          }`}
        >
          {value}
        </span>

        <span className="block date is-size-7 has-text-grey">
          {new Date(time).toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}

export default ChatMessage
