import React, { useEffect, useState } from "react"
import { IoWarning as WarningIcon } from "react-icons/io5"
import { BiSupport as SupportIcon } from "react-icons/bi"
import WooferLogo from "assets/WooferLogo.png"
import Socials from "config/socialConstants"

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

  useEffect(() => {
    if (serverCheckDone === false) {
      checkServerStatus((statusCheckPassed) => {
        setServerConnectionIsValid(statusCheckPassed)
        setServerCheckDone(true)
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
      {serverConnectionIsValid && firebaseConfigIsValid ? (
        <>{props.children}</>
      ) : (
        <>
          <section class="section">
            <div class="container">
              <div class="columns is-centered">
                <div class="column is-half">
                  <div className="field has-text-centered">
                    <img
                      className=" has-text-centered"
                      width="167"
                      src={WooferLogo}
                      alt="Woofer Logo"
                    ></img>
                  </div>

                  <article class="message is-warning">
                    <div class="message-header">
                      <p>Contact Support</p>
                      <SupportIcon />
                    </div>
                    <div class="message-body">
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
                    <article class="message is-danger">
                      <div class="message-header">
                        <p>Error</p>
                        <WarningIcon />
                      </div>
                      <div class="message-body">Unable to connect to Firebase</div>
                    </article>
                  )}
                  {!serverConnectionIsValid && (
                    <article class="message is-danger">
                      <div class="message-header">
                        <p>Server Failure</p>
                        <WarningIcon />
                      </div>
                      <div class="message-body">
                        Backend API is not currently running
                      </div>
                    </article>
                  )}
                </div>
              </div>
            </div>
          </section>
          <footer className="footer">
            <div className="columns pr-4 pr-4">
              <div className="column has-text-left">
                <p>Built by Spencer Lepine</p>

                <p>
                  view{" "}
                  <a href="https://github.com/spencerlepine/woofer">Source Code</a>
                </p>
              </div>

              <div className="column has-text-right">
                <h4>Find me here</h4>
                {Socials.map((social, i) => (
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="socialLink"
                  >
                    <p>{social.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  )

  return <>{loading ? <p>Loading...</p> : <InfoOrAlert />}</>
}

export default StatusCheck
