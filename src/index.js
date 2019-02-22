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

getState()
  .then(logSuccess, logFailure)
  .then(nextState => {
    state = nextState
    return getState()
  })
  .then(response => {
    console.log("is me!")
    logSuccess(response)
  }, logFailure)
