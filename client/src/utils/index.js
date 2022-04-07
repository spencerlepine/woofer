const calculateAge = (dob, dt) => {
  dt = dt || new Date()
  var diff = dt.getTime() - new Date(dob).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}

const isDate = (dateStr) => {
  return !isNaN(new Date(dateStr).getDate())
}

export const formatAgeStr = (birthDate) => {
  if (isDate(birthDate)) {
    const yearsOld = calculateAge(birthDate)
    return `${yearsOld} y/o`
  }
  return "? y/o"
}

export const capitalizeStr = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const titleCaseDisplayName = (firstName, lastName) => {
  if (typeof firstName === "string" && typeof lastName === "string") {
    const fullName = `${firstName} ${lastName}`

    return fullName.split(" ").map(capitalize).join(" ")
  }

  return ""
}
