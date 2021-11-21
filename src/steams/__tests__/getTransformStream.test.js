const { Transform } = require('stream');
const getTransformStream = require('../getTransformStream');

describe('getTransformStream', () => {
  test('should be defined', () => {
    expect(getTransformStream).toBeDefined();
  });

  test('should return transform stream on valid config', () => {
    const stream = getTransformStream('C1-C0');

    expect(stream).toBeInstanceOf(Transform);
  });

  // TODO: rewrite test after crosscheck
  test('stream should work', () => {
    const stream = getTransformStream('C1-C0');
    const cb = jest.fn();

    expect(() => {
      stream._transform('chunk', 'utf-8', cb);
    }).not.toThrow();

    expect(cb).toBeCalled();
  });
});
