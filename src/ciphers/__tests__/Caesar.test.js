const Caesar = require('../Caesar');

describe('Caesar', () => {
  test('should be defined', () => {
    expect(Caesar).toBeDefined();
  });

  let cipher;

  beforeEach(() => {
    cipher = new Caesar();
  });

  test.each([
    ['ABCD', 'BCDE'],
    ['abcd', 'bcde'],
    ['123', '123'],
    ['A1B1', 'B1C1'],
    ['Z1A1', 'A1B1'],
    ['"_"AAA', '"_"BBB'],
  ])('should encrypt text', (data, expected) => {
    expect(cipher.encrypt(data)).toBe(expected);
  });

  test.each([
    ['BCDE', 'ABCD'],
    ['bcde', 'abcd'],
    ['123', '123'],
    ['B1C1', 'A1B1'],
    ['A1B1', 'Z1A1'],
    ['"_"BBB', '"_"AAA'],
  ])('should decrypt text', (data, expected) => {
    expect(cipher.decrypt(data)).toBe(expected);
  });
});
