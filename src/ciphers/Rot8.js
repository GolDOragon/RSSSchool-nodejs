const Caesar = require('./Caesar');

class Rot8 extends Caesar {
  encrypt(data) {
    return data
      .split('')
      .map((letter) => super.getShiftedLetter(letter, 8))
      .join('');
  }

  decrypt(data) {
    return data
      .split('')
      .map((letter) => super.getShiftedLetter(letter, -8))
      .join('');
  }
}

module.exports = Rot8;
