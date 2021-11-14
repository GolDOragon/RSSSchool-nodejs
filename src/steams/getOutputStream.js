const fs = require('fs');
const { AppError, CODES } = require('../AppError');

async function getOutputStream(file) {
  if (!file) {
    process.stdout.write("You don't write output file, will use stdout\n");
    return process.stdout;
  }

  try {
    await fs.accessSync(file, fs.constants.W_OK);

    return fs.createWriteStream(file, { flags: 'a' });
  } catch {
    throw new AppError("Can't get access to output file", CODES.noAccessToWrite);
  }
}

module.exports = getOutputStream;
