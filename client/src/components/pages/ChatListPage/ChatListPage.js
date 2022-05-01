import React from "react"
import ChatList from "./ChatList/ChatList"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const ChatListPage = () => <ChatList />

const isAuthPage = false
export default withAuthRedirect(ChatListPage, isAuthPage)
