import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import "bulma/css/bulma.css"

import App from "./components/App"

const history = createBrowserHistory()

window.toTitleCase = (key) => {
  const result = key.replace("_", " ").replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1)
}

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Router>,
  document.getElementById("root")
)
