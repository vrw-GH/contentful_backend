class ErrorResponse extends Error {
  constructor(error, code) {
    super(error);
    this.myErrCode = code;
    console.log(`### **${code}**: ${error}`);
  }
}

export default ErrorResponse;
