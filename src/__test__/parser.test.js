const Parser = require('../Parser');

describe('Parser', () => {
  test('should be defined', () => {
    expect(Parser).toBeDefined();
  });

  let parser;
  let ARGV;

  beforeEach(() => {
    parser = new Parser();
    ARGV = [
      'path/to/folder',
      'path/to/folder/file.js',
      '--config',
      'C1-C1-R0-A',
      '-i',
      './input.txt',
      '-o',
      './output.txt',
    ];
  });

  test('should return correct object', () => {
    expect(parser.parse(ARGV)).toEqual({
      config: 'C1-C1-R0-A',
      input: './input.txt',
      output: './output.txt',
    });
  });

  describe('config:', () => {
    test("should throw error if there isn't config option", () => {
      ARGV.splice(2, 2);
      expect(() => {
        parser.parse(ARGV);
      }).toThrow('You haven\'t written config option, please provide "-c" or "--config" option!');
    });

    test('should throw error if there are more than one config option', () => {
      ARGV.push('--config');
      ARGV.push('TATAKE');

      expect(() => {
        parser.parse(ARGV);
      }).toThrow('Too many config options, please provide only one "-c" or "--config" option!');
    });
  });

  describe('input:', () => {
    test('should return "stdout" if there isn\'t input option', () => {
      ARGV.splice(4, 2);
      expect(() => {
        parser.parse(ARGV);
      }).toThrow('You haven\'t written config option, please provide "-i" or "--input" option!');
    });

    test('should throw error if there are more than one input option', () => {
      ARGV.push('--input');
      ARGV.push('./new_input_file.txt');

      expect(() => {
        parser.parse(ARGV);
      }).toThrow('Too many config options, please provide only one "-i" or "--input" option!');
    });
  });

  describe('output:', () => {
    test('should return "stdout" if there isn\'t output option', () => {
      ARGV.splice(6, 2);
      expect(() => {
        parser.parse(ARGV);
      }).toThrow('You haven\'t written config option, please provide "-o" or "--output" option!');
    });

    test('should throw error if there are more than one output option', () => {
      ARGV.push('--output');
      ARGV.push('./new_output_file.txt');

      expect(() => {
        parser.parse(ARGV);
      }).toThrow('Too many config options, please provide only one "-o" or "--output" option!');
    });
  });
});
