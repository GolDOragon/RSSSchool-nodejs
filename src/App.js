const { pipeline } = require('stream');
const Parser = require('./Parser');
const getInputStream = require('./getInputStream');
const getTransformStream = require('./getTransformStream');
const getOutputStream = require('./getOutputStream');

class App {
  #parser = new Parser();

  #getInputStream = getInputStream;

  #getTransformStream = getTransformStream;

  #getOutputStream = getOutputStream;

  async execute(argv) {
    try {
      const { config, input, output } = this.#parser.parse(argv);

      const inputStream = await this.#getInputStream(input);
      const outputStream = await this.#getOutputStream(output);

      const transformStream = this.#getTransformStream(config);

      pipeline(inputStream, transformStream, outputStream, (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
        }
      });
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }
}

module.exports = App;
