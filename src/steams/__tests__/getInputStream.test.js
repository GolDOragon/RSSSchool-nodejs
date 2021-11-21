const fs = require('fs');
const path = require('path');
const { AppError } = require('../../AppError');
const getInputStream = require('../getInputStream');

const filePath = path.join(__dirname, 'test-input.txt');

describe('getInputStream', () => {
  afterAll(() => {
    fs.rmSync(filePath);
  });

  test('should be defined', () => {
    expect(getInputStream).toBeDefined();
  });

  test('if file is readable, should return read stream', () => {
    fs.writeFileSync(filePath, 'tatake');

    getInputStream(filePath).then((data) => expect(data).toBeInstanceOf(fs.ReadStream));
  });

  test("if file wasn't passed, should return process.stdin", () => {
    getInputStream(undefined).then((data) => expect(data).toEqual(process.stdin));
  });

  test("if file isn't readable, should throw custom error", () => {
    jest.spyOn(fs, 'accessSync').mockImplementation(() => {
      throw new Error();
    });

    getInputStream('file').catch((err) => expect(err).toBeInstanceOf(AppError));
  });
});
