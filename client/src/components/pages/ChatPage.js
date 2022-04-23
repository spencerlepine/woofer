import React from "react"
import SampleChat from "components/SampleChat/SampleChat"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const ChatPage = () => <SampleChat />

const isAuthPage = false
export default withAuthRedirect(ChatPage, isAuthPage)
