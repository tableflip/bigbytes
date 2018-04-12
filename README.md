# bigbytes

[![Build Status](https://travis-ci.org/tableflip/bigbytes.svg?branch=master)](https://travis-ci.org/tableflip/bigbytes) [![dependencies Status](https://david-dm.org/tableflip/bigbytes/status.svg)](https://david-dm.org/tableflip/bigbytes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Utility to parse a string bytes (ex: 1TB) to a big.js bytes (1099511627776) and vice-versa.

This is [bytes.js](https://github.com/visionmedia/bytes.js), modified to accept/return [big.js](https://github.com/MikeMcl/big.js/) numbers.

## Install

```sh
npm install bigbytes
```

## Usage

```js
var bytes = require('bigbytes')
```

#### bytes.format(number value, [options]): string｜null

Format the given value in bytes into a string. If the value is negative, it is kept as such. If it is a float, it is
 rounded.

**Arguments**

| Name    | Type     | Description        |
|---------|----------|--------------------|
| value   | `Big`    | Value in bytes     |
| options | `Object` | Conversion options |

**Options**

| Property          | Type   | Description                                                                             |
|-------------------|--------|-----------------------------------------------------------------------------------------|
| decimalPlaces | `number`｜`null` | Maximum number of decimal places to include in output. Default value to `2`. |
| fixedDecimals | `boolean`｜`null` | Whether to always display the maximum number of decimal places. Default value to `false` |
| thousandsSeparator | `string`｜`null` | Example of values: `' '`, `','` and `.`... Default value to `''`. |
| unit | `string`｜`null` | The unit in which the result will be returned (B/KB/MB/GB/TB). Default value to `''` (which means auto detect). |
| unitSeparator | `string`｜`null` | Separator to use between number and unit. Default value to `''`. |

**Returns**

| Name    | Type             | Description                                     |
|---------|------------------|-------------------------------------------------|
| results | `string`｜`null` | Return null upon error. String value otherwise. |

**Example**

```js
var bytes = require('bigbytes')
var Big = require('big.js')

bytes(Big(1024))
// output: '1KB'

bytes(Big(1000))
// output: '1000B'

bytes(Big(1000), {thousandsSeparator: ' '})
// output: '1 000B'

bytes(Big(1024 * 1.7), {decimalPlaces: 0})
// output: '2KB'

bytes(Big(1024), {unitSeparator: ' '})
// output: '1 KB'
```

#### bytes.parse(string｜number value): Big｜null

Parse the string value into an integer in bytes. If no unit is given, or `value`
is a number, it is assumed the value is in bytes.

Supported units and abbreviations are as follows and are case-insensitive:

  * `b` for bytes
  * `kb` for kilobytes
  * `mb` for megabytes
  * `gb` for gigabytes
  * `tb` for terabytes

The units are in powers of two, not ten. This means 1kb = 1024b according to this parser.

**Arguments**

| Name          | Type   | Description        |
|---------------|--------|--------------------|
| value   | `string`｜`number` | String to parse, or number in bytes.   |

**Returns**

| Name    | Type        | Description             |
|---------|-------------|-------------------------|
| results | `Big`｜`null` | Return null upon error. Value in bytes otherwise. |

**Example**

```js
var bytes = require('bigbytes')
var Big = require('big.js')

bytes('1KB')
// output: Big(1024)

bytes('1024')
// output: Big(1024)

bytes(1024)
// output: Big(1024)
```

## Contribute

Feel free to dive in! [Open an issue](https://github.com/tableflip/bigbytes/issues/new) or submit PRs.

## License

[MIT](LICENSE)
