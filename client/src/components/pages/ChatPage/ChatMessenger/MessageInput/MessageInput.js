import React, { useState } from "react"
import { FiSend } from "react-icons/fi"
import { FaKeyboard } from "react-icons/fa"

const MessageInput = ({ socket }) => {
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value !== "") {
      // const filteredString = value.replace(/[^(a-zA-Z)+(!@#$%^&*\())+]/g, "")
      const trimmedString = value.substring(0, 255)
      socket.emit("message", trimmedString)
      setValue("")
    }
  }

  return (
    <div className="tile is-child">
      <form className="field has-addons" onSubmit={handleSubmit}>
        <div className="control is-expanded has-icons-left">
          <input
            className="input is-medium"
            type="text"
            placeholder="Enter message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <span className="icon is-medium is-left">
            <FaKeyboard />
          </span>
        </div>
        <div className="control">
          <button
            id="ChatRoomSendBtn"
            className="button is-medium is-primary"
            onClick={handleSubmit}
          >
            Send&nbsp;&nbsp;
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
