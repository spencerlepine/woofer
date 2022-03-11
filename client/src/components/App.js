import React from "react"
import "./App.css"
import ExampleButton from "components/ExampleButton/ExampleButton"

const App = () => (
  <div className="App">
    <header className="App-header">
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <br />
      <ExampleButton name={"Tyler"} />
    </header>
  </div>
)

export default App
