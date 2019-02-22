class PromiseOwn {
  constructor(executor) {
    this.onSuccessFunctions = []
    this.onFailureFunctions = []
    this.isPromise = true
    this.resolveReturnedPromise
    this.rejectReturnedPromise

    executor(this.resolve, this.reject)
  }

  resolve(value) {
    this.onSuccessFunctions.forEach(onSuccessFunction => {
      onSuccessFunction(value)
    })
  }

  reject(value) {
    this.onFailureFunctions.forEach(onFailureFunction => {
      onFailureFunction(value)
    })
  }

  then(onSuccess, onFailure) {
    const onSuccessWrapper = value => {
      const result = onSuccess(value)
      if (result && result.isPromise) {
        return result.then(
          this.resolveReturnedPromise,
          this.rejectReturnedPromise
        )
      }
      resolveReturnedPromise(result)
    }

    this.onSuccessFunctions.push(onSuccessWrapper)
    this.onFailureFunctions.push(onFailure)

    return new PromiseOwn((resolve, reject) => {
      this.resolveReturnedPromise = resolve
      this.rejectReturnedPromise = reject
    })
  }
}

module.exports = { PromiseOwn }
