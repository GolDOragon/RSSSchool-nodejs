const fs = require('fs');

async function getWriteStream(file) {
  if (!file) {
    console.log("You don't write output file, will use stdout");
    return process.stdout;
  }

  try {
    await fs.accessSync(file, fs.constants.W_OK);

    return fs.createWriteStream(file);
  } catch {
    throw new Error("Can't get access to output file");
  }
}

module.exports = getWriteStream;
