import React, { useState, useContext, useEffect } from "react"
import dogsAPI from "api/dogs"

export const PuppiesContext = React.createContext()

export const PuppiesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [puppiesList, setPuppiesList] = useState([])

  const getAllPuppies = () => {
    dogsAPI.fetchAllPuppies({ limit: 5 }, (puppies) => {
      // setPuppiesList(puppies)
      console.log("Fetched new puppies!")
    })
  }

  const addPuppyToList = (newPuppy) => {
    dogsAPI.addPuppy(newPuppy, (puppy) => {
      setPuppiesList((prevList) => prevList.concat(puppy))
    })
  }

  // Display a defualt product for the Overview
  useEffect(() => {
    getAllPuppies()
  }, [])

  const value = {
    loading,
    puppiesList,
    addPuppyToList,
  }

  return <PuppiesContext.Provider value={value}>{children}</PuppiesContext.Provider>
}

const usePuppies = () => useContext(PuppiesContext)

export default usePuppies
