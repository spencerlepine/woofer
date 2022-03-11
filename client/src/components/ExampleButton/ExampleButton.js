import React from "react"

const ExampleButton = ({ name }) => {
  const handleClick = () => {
    alert(`Hello ${name}!`)
  }

  return <button onClick={handleClick}>Say Hello</button>
}

export default ExampleButton
