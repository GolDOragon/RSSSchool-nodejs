# Ciphering CLI Tool

## Usage

1. download repository
2. open console in repository folder
3. use command `node ./src/index.js`

If you'd like to run test:

1. download repository
2. open console in repository folder
3. run `npm install`
4. run `npm t`

## Implementation of CLI tool that encodes and decodes a text by 3 substitution ciphers:

- [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
- [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

CLI tool accepts 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
    Config is a string with pattern `{XY(-)}n`, where:

- `X` is a cipher mark:
  - `C` is for Caesar cipher (with shift 1)
  - `A` is for Atbash cipher
  - `R` is for ROT-8 cipher
- `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
  - `1` is for encoding
  - `0` is for decoding

2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

## Code status:

- **0** - success,
- **1** - unknown error

- **2** - options error
- - **21** - invalid "config" option
- - **22** - invalid "input" option
- - **23** - invalid "output" option

- **3** - input/output error
- - **31** - no access to read file
- - **32** - no access to write file
