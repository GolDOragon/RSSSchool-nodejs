const Caesar = require('./Caesar');
const Atbash = require('./Atbash');
const Rot8 = require('./Rot8');
const { AppError, CODES } = require('../AppError');

class Cipher {
  #config = [];

  #caesar = new Caesar();

  #atbash = new Atbash();

  #rot8 = new Rot8();

  constructor(config) {
    if (Cipher.#isValid(config)) {
      this.#config = config.split('-');
    } else {
      throw new AppError(
        'Invalid encrypt config, please use {XY(-)}n pattern',
        CODES.invalidConfigOption,
      );
    }
  }

  run(data) {
    return this.#config.reduce((encryptedData, mark) => {
      const cipher = this.#getCipher(mark);

      return cipher(encryptedData);
    }, data);
  }

  #getCipher(mark) {
    switch (mark) {
      case 'C0':
        return this.#caesar.decrypt;
      case 'C1':
        return this.#caesar.encrypt;
      case 'R0':
        return this.#rot8.decrypt;
      case 'R1':
        return this.#rot8.encrypt;
      default:
        return this.#atbash.encrypt;
    }
  }

  static #isValid(config) {
    return typeof config === 'string' && config.match(/^((([CR][10])|A)?-?)+$/);
  }
}

module.exports = Cipher;
