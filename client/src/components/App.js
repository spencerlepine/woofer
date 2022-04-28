import React from "react"
import ViewLayout from "components/ui/ViewLayout/ViewLayout"
import Routes from "components/Routes/Routes.js"
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
