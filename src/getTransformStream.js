const { Transform } = require('stream');
const Cipher = require('./ciphers/Cipher');

function getTransformStream(config) {
  const cipher = new Cipher(config);

  return new Transform({
    transform(chunk, encoding, cb) {
      const encryptedText = cipher.encrypt(chunk.toString());
      this.push(encryptedText);
      cb();
    },
  });
}

module.exports = getTransformStream;
