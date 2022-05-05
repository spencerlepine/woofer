import React, { useEffect, useState } from "react"
import { IoWarning as WarningIcon } from "react-icons/io5"
import { BiSupport as SupportIcon } from "react-icons/bi"
import WooferLogo from "assets/WooferLogo.png"
import Socials from "config/socialConstants"
import Footer from "components/ui/Footer/Footer"

import { auth, storage } from "config/firebase"
import * as statusAPI from "api/status"

const StatusCheck = (props) => {
  const [loading, setLoading] = useState(true)
  const [firebaseCheckDone, setFirebaseCheckDone] = useState(false)
  const [firebaseConfigIsValid, setFirebaseConfigIsValid] = useState(false)
  const [serverCheckDone, setServerCheckDone] = useState(false)
  const [serverConnectionIsValid, setServerConnectionIsValid] = useState(false)
  const [apiErorr, setApiError] = useState("")
  const [mongoCheckDone, setMongoCheckDone] = useState(false)
  const [mongoConnectionIsValid, setMongoConnectionIsValid] = useState(false)

  const checkFirebaseConfig = (resultCallback) => {
    resultCallback(!!auth)
  }

  const checkServerStatus = (resultCallback) => {
    statusAPI.fetchServerStatus((isRunning, mongoIsRunning, error) => {
      resultCallback(isRunning, mongoIsRunning, error)
    })
  }

  useEffect(() => {
    if (loading) {
      if (firebaseCheckDone && serverCheckDone) {
        setLoading(false)
      }
    }
  }, [firebaseCheckDone, serverCheckDone])

  useEffect(() => {
    if (serverCheckDone === false) {
      checkServerStatus((statusCheckPassed, mongoCheckPassed, error) => {
        setServerConnectionIsValid(statusCheckPassed)
        setMongoConnectionIsValid(mongoCheckPassed)
        setApiError(error)
        setServerCheckDone(true)
        setMongoCheckDone(true)
      })
    }
  }, [serverCheckDone])

  useEffect(() => {
    if (firebaseCheckDone === false) {
      checkFirebaseConfig((statusCheckPassed) => {
        setFirebaseConfigIsValid(statusCheckPassed)
        setFirebaseCheckDone(true)
      })
    }
  }, [firebaseCheckDone])

  const InfoOrAlert = () => (
    <>
      {serverConnectionIsValid && firebaseConfigIsValid && mongoConnectionIsValid ? (
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
                        <span className="firebaseError">
                          Unable to connect to Firebase
                        </span>
                      </div>
                    </article>
                  )}
                  {!mongoConnectionIsValid && (
                    <article className="message is-danger">
                      <div className="message-header">
                        <p>Database Error</p>
                        <WarningIcon />
                      </div>
                      <div className="message-body">
                        <span className="firebaseError">
                          Unable to connect to MongoDB Atlas
                        </span>
                      </div>
                    </article>
                  )}
                  {!serverConnectionIsValid && (
                    <article className="message is-danger">
                      <div className="message-header">
                        <p>Server Failure</p>
                        <WarningIcon />
                      </div>
                      <div className="message-body ">
                        <span className="apiError">
                          Backend API is not currently running
                        </span>
                      </div>
                      {console.log(apiErorr)}
                      {/* <div className="column is-half message-footer">
                        <p>{apiErorr}</p>
                      </div> */}
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
