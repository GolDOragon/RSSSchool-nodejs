const { AppError, CODES } = require('./AppError');

// TODO: move common code in a function
class Parser {
  parse(argv) {
    const args = argv.slice(2);

    return {
      config: this.#getConfig(args),
      input: this.#getInput(args),
      output: this.#getOutput(args),
    };
  }

  #CONFIG_OPTION = ['-c', '--config'];

  #getConfig(args) {
    const isConfigOption = (arg) => this.#CONFIG_OPTION.includes(arg);

    const optionCount = args.filter(isConfigOption).length;

    if (optionCount > 1) {
      throw new AppError(
        'Too many config options, please provide only one "-c" or "--config" option!',
        CODES.invalidConfigOption,
      );
    }

    if (!optionCount) {
      throw new AppError(
        'You haven\'t written config option, please provide "-c" or "--config" option!',
        CODES.invalidConfigOption,
      );
    }

    const index = args.findIndex(isConfigOption);

    return args[index + 1];
  }

  #INPUT_OPTIONS = ['-i', '--input'];

  #getInput(args) {
    const isInputOption = (arg) => this.#INPUT_OPTIONS.includes(arg);
    const optionCount = args.filter(isInputOption).length;

    if (optionCount > 1) {
      throw new AppError(
        'Too many input options, please provide only one "-i" or "--input" option!',
        CODES.invalidInputOption,
      );
    }

    if (!optionCount) {
      return undefined;
    }

    const index = args.findIndex(isInputOption);

    return args[index + 1];
  }

  #OUTPUT_OPTIONS = ['-o', '--output'];

  #getOutput(args) {
    const isOutputOption = (arg) => this.#OUTPUT_OPTIONS.includes(arg);
    const optionCount = args.filter(isOutputOption).length;

    if (optionCount > 1) {
      throw new AppError(
        'Too many output options, please provide only one "-o" or "--output" option!',
        CODES.invalidOutputOption,
      );
    }

    if (!optionCount) {
      return undefined;
    }

    const index = args.findIndex(isOutputOption);

    return args[index + 1];
  }
}

module.exports = Parser;
