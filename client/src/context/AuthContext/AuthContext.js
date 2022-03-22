import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as authUser from 'api/account';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [accountDetails, setAccountDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser.checkLoginStatus(authenicatedUser => {
      if (authenicatedUser) {
        setCurrentUser(authenicatedUser);
      }
    }, []);
  }, []);

  function getAccountDetails() {
    setLoading(true);
    authUser.fetchAccountDetails(userDetails => {
      setAccountDetails(userDetails);
      setLoading(false);
    });
  }

  function loginUser(email, password) {
    setLoading(true);
    authUser.signInWithEmailAndPassword(email, password, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }

  function signupUser(displayName, email, password) {
    setLoading(true);
    authUser.createUserWithEmailAndPassword(displayName, email, password, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }

  function updateProfilePic(newFile) {
    setLoading(true);
    authUser.updateProfilePic(newFile, newImage => {
      console.log('TODO -> RETURN THE NEW IMAGE URL', newImage);
      setLoading(false);
    });
  }

  function logoutUser() {
    setLoading(true);
    authUser.signOut(() => {
      setCurrentUser(null);
      setLoading(false);
    });
  }

  function resetPassword(email) {
    setLoading(true);
    authUser.sendPasswordResetEmail(email, () => {
      setLoading(false);
    });
  }

  function updateEmail(email) {
    setLoading(true);
    authUser.updateEmail(email, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }

  function updatePassword(password) {
    setLoading(true);
    authUser.updatePassword(password, () => {
      setLoading(false);
    });
  }

  const value = {
    loading,
    accountDetails,
    resetPassword,
    updatePassword,
    updateEmail,
    currentUser,
    loginUser,
    logoutUser,
    signupUser,
    getAccountDetails,
    updateProfilePic,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
