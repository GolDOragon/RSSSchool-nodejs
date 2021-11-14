const fs = require('fs');

async function getReadStream(file) {
  if (!file) {
    console.log("You don't write input file, will use stdin");
    return process.stdin;
  }

  try {
    await fs.accessSync(file, fs.constants.R_OK);

    return fs.createReadStream(file, { flags: 'r' });
  } catch {
    throw new Error("Can't get access to input file");
  }
}

module.exports = getReadStream;
