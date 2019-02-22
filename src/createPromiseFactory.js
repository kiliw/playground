const createPromise = executor => {
  const onSuccessFunctions = []
  const onFailureFunctions = []

  const resolve = value =>
    onSuccessFunctions.forEach(onSuccessFunction => {
      onSuccessFunction(value)
    })

  const reject = value =>
    onFailureFunctions.forEach(onFailureFunction => {
      onFailureFunction(value)
    })

  executor(resolve, reject)

  return {
    isPromise: true,
    then: (onSuccess, onFailure) => {
      let resolveReturnedPromise
      let rejectReturnedPromise

      const onSuccessWrapper = value => {
        const result = onSuccess(value)
        if (result && result.isPromise) {
          return result.then(resolveReturnedPromise, rejectReturnedPromise)
        }
        resolveReturnedPromise(result)
      }

      onSuccessFunctions.push(onSuccessWrapper)
      onFailureFunctions.push(onFailure)

      return createPromise((resolve, reject) => {
        resolveReturnedPromise = resolve
        rejectReturnedPromise = reject
      })
    }
  }
}

const createRealPromise = executor => new Promise(executor)

module.exports = { createPromise, createRealPromise }
