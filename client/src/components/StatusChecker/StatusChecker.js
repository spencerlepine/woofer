import React, { useEffect, useState } from "react"
import { IoWarning as WarningIcon } from "react-icons/io5"
import { BiSupport as SupportIcon } from "react-icons/bi"
import WooferLogo from "assets/WooferLogo.png"
import Socials from "config/socialConstants"
import Footer from "components/ui/Footer/Footer"

const StatusCheck = (props) => {
  const [loading, setLoading] = useState(true)
  const [firebaseCheckDone, setFirebaseCheckDone] = useState(false)
  const [firebaseConfigIsValid, setFirebaseConfigIsValid] = useState(false)
  const [serverCheckDone, setServerCheckDone] = useState(false)
  const [serverConnectionIsValid, setServerConnectionIsValid] = useState(false)

  const checkFirebaseConfig = (resultCallback) => {
    // TODO
    // Firebase config is not valid!
    resultCallback(false)
  }

  const checkServerStatus = (resultCallback) => {
    // TODO
    // Server is not connected!
    resultCallback(false)
  }

  useEffect(() => {
    if (loading) {
      if (firebaseCheckDone && serverCheckDone) {
        setLoading(false)
      }
    }
  }, [firebaseCheckDone, serverCheckDone])

  // useEffect(() => {
  //   if (serverCheckDone === false) {
  //     checkServerStatus((statusCheckPassed) => {
  //       setServerConnectionIsValid(statusCheckPassed)
  //       setServerCheckDone(true)
  //     })
  //   }
  // }, [serverCheckDone])

  // useEffect(() => {
  //   if (firebaseCheckDone === false) {
  //     checkFirebaseConfig((statusCheckPassed) => {
  //       setFirebaseConfigIsValid(statusCheckPassed)
  //       setFirebaseCheckDone(true)
  //     })
  //   }
  // }, [firebaseCheckDone])

  const InfoOrAlert = () => (
    <>
      {serverConnectionIsValid && firebaseConfigIsValid ? (
        <>{props.children}</>
      ) : (
        <>
          <section className="section">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-half">
                  <div className="field has-text-centered">
                    <img
                      className=" has-text-centered"
                      width="167"
                      src={WooferLogo}
                      alt="Woofer Logo"
                    ></img>
                  </div>

                  <article className="message is-warning">
                    <div className="message-header">
                      <p>Contact Support</p>
                      <SupportIcon />
                    </div>
                    <div className="message-body">
                      Please reach out to{" "}
                      <span className="has-text-link">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://twitter.com/SpencerLepine"
                        >
                          @spencerlepine
                        </a>
                      </span>{" "}
                      for help
                    </div>
                  </article>

                  {!firebaseConfigIsValid && (
                    <article className="message is-danger">
                      <div className="message-header">
                        <p>Error</p>
                        <WarningIcon />
                      </div>
                      <div className="message-body">
                        Unable to connect to Firebase
                      </div>
                    </article>
                  )}
                  {!serverConnectionIsValid && (
                    <article className="message is-danger">
                      <div className="message-header">
                        <p>Server Failure</p>
                        <WarningIcon />
                      </div>
                      <div className="message-body">
                        Backend API is not currently running
                      </div>
                    </article>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  )

  const LoadingSpinner = () => (
    <>
      <div className="section is-vcentered">
        <div className="columns  is-flex is-vcentered">
          <div className="column is-6 mx-auto">
            <h2 className="title is-2">
              <div className="loader-wrapper mx-auto">
                <div className="loader is-loading mx-auto"></div>
              </div>

              <div className="field has-text-centered mt-6">
                <img
                  className=" has-text-centered"
                  width="167"
                  src={WooferLogo}
                  alt="Woofer Logo"
                ></img>
              </div>
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )

  return <>{loading ? <LoadingSpinner /> : <InfoOrAlert />}</>
}

export default StatusCheck
