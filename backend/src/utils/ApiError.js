class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  toString() {
    return this.message;
  }
}

export default ApiError;