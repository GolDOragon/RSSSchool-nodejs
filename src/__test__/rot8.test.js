const Rot8 = require('../ciphers/Rot8');

describe('ROT-8', () => {
  test('should be defined', () => {
    expect(Rot8).toBeDefined();
  });

  let cipher;

  beforeEach(() => {
    cipher = new Rot8();
  });

  test.each([
    ['ABCD', 'IJKL'],
    ['abcd', 'ijkl'],
    ['123', '123'],
    ['A1B1', 'I1J1'],
    ['Z1A1', 'H1I1'],
    ['"_"AAA', '"_"III'],
  ])('should encrypt text', (data, expected) => {
    expect(cipher.encrypt(data)).toBe(expected);
  });

  test.each([
    ['IJKL', 'ABCD'],
    ['ijkl', 'abcd'],
    ['123', '123'],
    ['I1J1', 'A1B1'],
    ['H1I1', 'Z1A1'],
    ['"_"III', '"_"AAA'],
  ])('should decrypt text', (data, expected) => {
    expect(cipher.decrypt(data)).toBe(expected);
  });
});
