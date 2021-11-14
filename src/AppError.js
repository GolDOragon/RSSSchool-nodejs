class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

const CODES = {
  success: 0,
  unknownError: 1,

  optionsError: 2,
  invalidConfigOption: 21,
  invalidInputOption: 22,
  invalidOutputOption: 23,

  inputOutputError: 3,
  noAccessToRead: 31,
  noAccessToWrite: 32,
};

module.exports = { AppError, CODES };
