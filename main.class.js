const { PromiseOwn } = require("./createPromiseClass")

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

const getState = new PromiseOwn(waitAndResolveWithResponse)

const logSuccess = response => {
  console.log(`There was a success with ${response}`)
  return "FAILURE"
}
const logFailure = error => {
  console.log(`There was an error with ${error}`)
}

console.log("START: its the class!")
getState
  .then(logSuccess, logFailure)
  .then(nextState => {
    console.log("log: change(state")
    state = nextState
    console.log("state", state)
    return getState
  }, logFailure)
  .then(response => {
    console.log("log: last")
    logSuccess(response)
  }, logFailure)
