class UnhandledError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnhandledError';
    this.statusCode = 500;
  }
}

module.exports = UnhandledError;
