const Caesar = require('./Caesar');
const Atbash = require('./Atbash');
const Rot8 = require('./Rot8');

class Cipher {
  encrypt(data) {
    return this.#config.reduce((encryptedData, mark) => {
      const cipher = this.#getCipher(mark);

      return cipher(encryptedData);
    }, data);
  }

  #config = [];

  #caesar = new Caesar();

  #atbash = new Atbash();

  #rot8 = new Rot8();

  constructor(config) {
    if (Cipher.#isValid(config)) {
      this.#config = config.split('-');
    } else {
      throw new Error('Invalid encrypt config, please use {XY(-)}n pattern');
    }
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
      case 'A':
        return this.#atbash.encrypt;
      default:
        return (data) => data;
    }
  }

  static #isValid(config) {
    return typeof config === 'string' && config.match(/^([CRA][10]?-?)+$/);
  }
}

module.exports = Cipher;
