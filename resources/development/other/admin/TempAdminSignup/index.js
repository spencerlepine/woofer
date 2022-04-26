import React, { useEffect } from "react"
import { createUserWithEmailAndPassword } from "api/account"
import { addUserToZipcode } from "api/zipcodes"
import usersJSON from "./users.json"

const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)]
}

const TempAdminSignup = () => {
  const { users } = usersJSON

  const userIdsDone = {}
  const PASSWORD = "123password$$$"

  const handleClick = () => {
    const thisUser = pickRandom(users)
    const { email, firstName, lastName } = thisUser

    if (userIdsDone[email]) {
      console.log("User already signed up!!!")
    } else {
      console.clear()
      console.log("Ready to sign up user!")

      createUserWithEmailAndPassword(
        `${firstName} ${lastName}`,
        email,
        PASSWORD,
        thisUser,
        (user) => {
          console.log(`Signed up the user: ${firstName} - ${email}`)
          console.log(`Putting ${firstName} in ZipCode Pool: 10001`)

          setTimeout(() => {
            addUserToZipcode("10001", () => {
              console.log(`=> Added ${firstName} to ZipCode Pool: 10001`)
            })
          }, 3000)
        }
      )

      userIdsDone[email] = "XXXX"
    }
  }

  return (
    <>
      <button className="button is-info" onClick={handleClick}>
        Sign Up Mock User
      </button>
    </>
  )
}

export default TempAdminSignup
