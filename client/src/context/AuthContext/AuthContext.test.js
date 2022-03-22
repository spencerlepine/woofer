// import React from 'react';
// import { screen, render } from 'test-utils';
// import * as authUser from 'api/firebase/account';
import useAuth, { AuthProvider } from "./AuthContext"
import { testContextExports } from "utils/test-utils"

describe("AuthContext", () => {
  const expectedExports = [
    {
      key: "loading",
      targetInstance: Boolean,
    },
    {
      key: "resetPassword",
      targetInstance: Function,
    },
    {
      key: "updatePassword",
      targetInstance: Function,
    },
    {
      key: "updateEmail",
      targetInstance: Function,
    },
    {
      key: "currentUser",
      targetInstance: Object,
    },
    {
      key: "loginUser",
      targetInstance: Function,
    },
    {
      key: "logoutUser",
      targetInstance: Function,
    },
    {
      key: "signupUser",
      targetInstance: Function,
    },
    {
      key: "updateProfilePic",
      targetInstance: Function,
    },
    {
      key: "accountDetails",
      targetInstance: Object,
    },
    {
      key: "getAccountDetails",
      targetInstance: Function,
    },
  ]

  testContextExports(AuthProvider, useAuth, expectedExports)
})
