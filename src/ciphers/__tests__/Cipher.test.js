const Cipher = require('../Cipher');

describe('Cipher', () => {
  test('should be defined', () => {
    expect(Cipher).toBeDefined();
  });

  test('should throw error on invalid config', () => {
    expect(() => {
      const cipher = new Cipher('A0-C2');
      cipher.run('TATAKE MY FRiend');
    }).toThrow('Invalid encrypt config, please use {XY(-)}n pattern');
  });

  test('should run on valid config', () => {
    expect(() => {
      const cipher = new Cipher('C1-C0-A-R0-R1');
      cipher.run('TATAKE');
    }).not.toThrow();
  });
});
