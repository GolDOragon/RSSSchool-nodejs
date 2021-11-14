const fs = require('fs');
const { AppError, CODES } = require('../AppError');

async function getInputStream(file) {
  if (!file) {
    process.stdout.write("You don't write input file, will use stdin\n");
    return process.stdin;
  }

  try {
    await fs.accessSync(file, fs.constants.R_OK);

    return fs.createReadStream(file, { flags: 'r' });
  } catch {
    throw new AppError("Can't get access to input file", CODES.noAccessToRead);
  }
}

module.exports = getInputStream;
