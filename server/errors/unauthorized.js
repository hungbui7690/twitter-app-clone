import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
    this.name = 'Unauthorized Error'
  }
}

export default UnauthorizedError
