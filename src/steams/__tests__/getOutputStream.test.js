const fs = require('fs');
const path = require('path');
const { AppError } = require('../../AppError');
const getOutputStream = require('../getOutputStream');

const filePath = path.join(__dirname, 'test-output.txt');

describe('getOutputStream', () => {
  afterAll(() => {
    fs.rmSync(filePath);
  });

  test('should be defined', () => {
    expect(getOutputStream).toBeDefined();
  });

  test('if file is writable, should return write stream', () => {
    fs.writeFileSync(filePath, 'tatake');

    getOutputStream(filePath).then((data) => expect(data).toBeInstanceOf(fs.WriteStream));
  });

  test("if file wasn't passed, should return process.stdin", () => {
    getOutputStream(undefined).then((data) => expect(data).toEqual(process.stdout));
  });

  test("if file isn't readable, should throw custom error", () => {
    jest.spyOn(fs, 'accessSync').mockImplementation(() => {
      throw new Error();
    });

    getOutputStream('file').catch((err) => expect(err).toBeInstanceOf(AppError));
  });
});
