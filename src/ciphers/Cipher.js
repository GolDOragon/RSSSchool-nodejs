class Cipher {
  encrypt(data) {
    return this.#config.reduce((encryptedData, mark) => {
      const cipher = this.#getCipher(mark);

      return cipher(encryptedData);
    }, data);
  }

  #config = [];

  #caesar = () => (d) => d;

  #atbash = () => (d) => d;

  #rot8 = () => (d) => d;

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
        return this.#caesar('encrypt');
      case 'C1':
        return this.#caesar('decrypt');
      case 'R0':
        return this.#rot8('encrypt');
      case 'R1':
        return this.#rot8('decrypt');
      case 'A':
        return this.#atbash();
      default:
        return (data) => data;
    }
  }

  static #isValid(config) {
    return typeof config === 'string' && config.match(/^([CRA][10]?-?)+$/);
  }
}

module.exports = Cipher;
