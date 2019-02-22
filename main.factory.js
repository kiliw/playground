const { createPromise } = require("./createPromiseFactory")

let state = "SUCCESS"
let response = "Nice"

const waitAndResolveWithResponse = (resolve, reject) => {
  setTimeout(() => {
    if (state !== "FAILURE") {
      return resolve(response)
    }
    reject("Unable to get the response")
  }, 1)
}

const getState = () => createPromise(waitAndResolveWithResponse)

const logSuccess = response => {
  console.log(`There was a success with ${response}`)
  return "FAILURE"
}
const logFailure = error => console.log(`There was an error with ${error}`)

console.log("START: its the factory!")
getState()
  .then(logSuccess, logFailure)
  .then(nextState => {
    console.log("change state")
    state = nextState
    return getState()
  })
  .then(response => {
    console.log("last")
    logSuccess(response)
  }, logFailure)
