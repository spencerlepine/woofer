import React from "react"
import ViewLayout from "components/wrappers/ViewLayout/ViewLayout"
import Routes from "components/wrappers/Routes/Routes.js"
import "./App.css"
import accounts from "api/account"

const App = () => (
  <div className="App">
    <ViewLayout>
      <Routes />
    </ViewLayout>
  </div>
)

export default App
