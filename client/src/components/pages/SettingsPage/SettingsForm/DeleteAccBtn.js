import * as userAPI from "api/account"
import useAuth from "context/AuthContext/AuthContext"

const DeleteAccBtn = () => {
  const { currentUser, logoutUser } = useAuth()

  const handleDelete = () => {
    if (currentUser && currentUser["uid"]) {
      const userId = currentUser["uid"] || currentUser["userId"]
      userAPI.deleteAccount(userId, () => {
        logoutUser()
      })
    }
  }

  return (
    <button className="button is-danger" onClick={handleDelete}>
      DELETE ACCOUNT
    </button>
  )
}

export default DeleteAccBtn
