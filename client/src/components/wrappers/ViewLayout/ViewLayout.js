import React from "react"
import PropTypes from "prop-types"
// import { NotificationsProvider } from 'context/NotificationsContext/NotificationsContext';
// import { AuthProvider } from 'context/AuthContext/AuthContext';
// import NotificationsPopup from 'components/ui/NotificationsPopup/NotificationsPopup';

import Footer from "components/ui/Footer/Footer"
import Navbar from "components/ui/Navbar/Navbar"

const ViewLayout = ({ children }) => {
  return (
    <React.Fragment>
      {/* <AuthProvider>
        <NotificationsProvider>
          <NotificationsPopup /> */}
      <Navbar />
      <div></div>
      <div>{children}</div>
      <div></div>
      <Footer />
      {/* </NotificationsProvider>
      </AuthProvider> */}
    </React.Fragment>
  )
}

export default ViewLayout

ViewLayout.propTypes = {
  children: PropTypes.any.isRequired,
}
