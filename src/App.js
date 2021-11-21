const { pipeline } = require('stream');
const Parser = require('./parser/Parser');
const getInputStream = require('./steams/getInputStream');
const getTransformStream = require('./steams/getTransformStream');
const getOutputStream = require('./steams/getOutputStream');
const { AppError } = require('./AppError');

class App {
  #parser = new Parser();

  #getInputStream = getInputStream;

  #getTransformStream = getTransformStream;

  #getOutputStream = getOutputStream;

  async execute(argv) {
    try {
      const { config, input, output } = await this.#parser.parse(argv);

      const inputStream = await this.#getInputStream(input);
      const outputStream = await this.#getOutputStream(output);

      const transformStream = this.#getTransformStream(config);

      pipeline(inputStream, transformStream, outputStream, (err) => {
        if (err) {
          if (err instanceof AppError) {
            process.stderr.write(`${err.toString()}\n`);
            process.on('exit', (code) => process.stdout.write(`code status: ${code.toString()}\n`));
            process.exit(err.code);
          } else {
            throw err;
          }
        }
      });
    } catch (err) {
      if (err instanceof AppError) {
        process.stderr.write(`${err.toString()}\n`);
        process.on('exit', (code) => process.stdout.write(`code status: ${code.toString()}\n`));
        process.exit(err.code);
      } else {
        throw err;
      }
    }
  }
}

module.exports = App;
