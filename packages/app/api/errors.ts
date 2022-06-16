class CryptoError extends Error {
    constructor(name: string, message: string) {
      super(message)
      this.name = name
    }
  }
  
  export const UNAUTHORIZED_ERROR_NAME = 'UNAUTHORIZED'
  export const NETWORK_ERROR_NAME = 'NETWORK'
  
  const UNAUTHORIZED_ERROR = new CryptoError(UNAUTHORIZED_ERROR_NAME, 'Please check your credentials.')
  const NETWORK_ERROR = new CryptoError(NETWORK_ERROR_NAME, 'Please check your internet connection.')
  
  const ERRORS = [UNAUTHORIZED_ERROR, NETWORK_ERROR]
  
  export const getError = (name: string) => {
    return ERRORS.find((error) => error.name === name)
  }
  
  export { UNAUTHORIZED_ERROR, NETWORK_ERROR }
  