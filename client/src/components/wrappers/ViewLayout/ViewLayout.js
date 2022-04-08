import React from "react"
import PropTypes from "prop-types"
import { AuthProvider } from "context/AuthContext/AuthContext"
import NotificationsPopup from "components/ui/NotificationsPopup/NotificationsPopup"

import Footer from "components/ui/Footer/Footer"
import Navbar from "components/ui/Navbar/Navbar"

const ViewLayout = ({ children }) => {
  return (
    <React.Fragment>
      <AuthProvider>
        <NotificationsPopup />
        <Navbar />
        <div className="container">{children}</div>
        <Footer />
      </AuthProvider>
    </React.Fragment>
  )
}

export default ViewLayout

ViewLayout.propTypes = {
  children: PropTypes.any.isRequired,
}
