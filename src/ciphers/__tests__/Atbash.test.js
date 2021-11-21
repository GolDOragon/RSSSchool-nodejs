const Atbash = require('../Atbash');

describe('Atbash', () => {
  test('should be defined', () => {
    expect(Atbash).toBeDefined();
  });

  let cipher;

  beforeEach(() => {
    cipher = new Atbash();
  });

  test.each([
    ['ABCD', 'ZYXW'],
    ['abcd', 'zyxw'],
    ['123', '123'],
    ['A1B1', 'Z1Y1'],
    ['Z1A1', 'A1Z1'],
    ['"_"AAA', '"_"ZZZ'],
  ])('should encrypt text', (data, expected) => {
    expect(cipher.encrypt(data)).toBe(expected);
  });

  test.each([
    ['ZYXW', 'ABCD'],
    ['zyxw', 'abcd'],
    ['123', '123'],
    ['Z1Y1', 'A1B1'],
    ['A1Z1', 'Z1A1'],
    ['"_"ZZZ', '"_"AAA'],
  ])('should decrypt text', (data, expected) => {
    expect(cipher.decrypt(data)).toBe(expected);
  });
});
