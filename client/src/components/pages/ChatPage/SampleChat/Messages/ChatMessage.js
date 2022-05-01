import React, { useEffect, useState } from "react"

function ChatMessage({ message }) {
  const {
    messageId,
    time,
    user: { name, userId },
    value,
  } = message

  return (
    <div
      key={messageId}
      className="message-container"
      title={`Sent at ${new Date(time).toLocaleTimeString()}`}
    >
      <span className="id">{userId}:</span>
      <span className="user">{name}:</span>
      <span className="message">{value}</span>
      <span className="date">{new Date(time).toLocaleTimeString()}</span>
    </div>
  )
}

export default ChatMessage
