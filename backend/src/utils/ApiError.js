
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // this.name = 'ApiError';
    // Error.captureStackTrace(this, this.constructor);
  }
  // Chúng ta sẽ tùy chỉnh phương thức `toString` để loại bỏ tiền tố "Error:"
  toString() {
    return this.message;  // Chỉ trả về message mà không có "Error:".
  }
}

export default ApiError;