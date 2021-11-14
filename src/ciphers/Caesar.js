class Caesar {
  constructor() {
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }

  encrypt(data) {
    return data
      .split('')
      .map((letter) => this.getShiftedLetter(letter, 1))
      .join('');
  }

  decrypt(data) {
    return data
      .split('')
      .map((letter) => this.getShiftedLetter(letter, -1))
      .join('');
  }

  #codeA = 65;

  #codeZ = 90;

  #code_a = 97;

  #code_z = 122;

  #alphabetLength = 26;

  getShiftedLetter(letter, shift) {
    const relativeShift = shift % this.#alphabetLength;
    const code = letter.codePointAt(0);

    let start;
    if (this.#codeA <= code && code <= this.#codeZ) {
      start = this.#codeA;
    } else if (this.#code_a <= code && code <= this.#code_z) {
      start = this.#code_a;
    }

    if (!start) return letter;

    const currentPosition = code - start;

    const absolutePosition = currentPosition + relativeShift + this.#alphabetLength;
    const expectedPosition = absolutePosition % this.#alphabetLength;

    return String.fromCodePoint(expectedPosition + start);
  }
}

module.exports = Caesar;
