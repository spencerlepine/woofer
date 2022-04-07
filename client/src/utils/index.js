const calculateAge = (dob) => {
  const birthday = new Date(dob)
  const todaysDate = new Date()
  const diff = new Date(todaysDate.getTime() - birthday.getTime())
  const yearDiff = diff.getUTCFullYear() - 1970
  return yearDiff
}

const isDate = (dateStr) => {
  return !isNaN(new Date(dateStr).getDate())
}

export const formatAgeStr = (birthDate) => {
  if (typeof birthDate === "string" && isDate(birthDate)) {
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

    return fullName.split(" ").map(capitalizeStr).join(" ")
  }

  return ""
}
