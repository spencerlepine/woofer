import React from "react"
import ReactDOM from "react-dom"
import { PuppiesProvider } from "context/PuppiesContext/PuppiesContext"
import "./index.css"
import App from "components/App"

ReactDOM.render(
  <React.StrictMode>
    <PuppiesProvider>
      <App />
    </PuppiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
