'use strict'

var Big = require('big.js')

/**
 * Module exports.
 * @public
 */

module.exports = bytes
module.exports.format = format
module.exports.parse = parse

/**
 * Module variables.
 * @private
 */

var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g

var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/

var map = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: ((1 << 30) * 1024)
}

var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i

// TODO: better isBig check
function isBig (value) {
  return value && value.constructor && value.constructor.DP
}

/**
 * Convert the given big.js value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|Big} value
 * @param {{
 *  case: [string],
 *  decimalPlaces: [number]
 *  fixedDecimals: [boolean]
 *  thousandsSeparator: [string]
 *  unitSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {Big|string|number|null}
 */

function bytes (value, options) {
  if (isBig(value)) {
    return format(value, options)
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return format(Big(value), options)
  }

  if (typeof value === 'string') {
    return parse(value)
  }

  return null
}

/**
 * Format the given big.js value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {Big} value
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]
 * @param {number} [options.fixedDecimals=false]
 * @param {string} [options.thousandsSeparator=]
 * @param {string} [options.unit=]
 * @param {string} [options.unitSeparator=]
 *
 * @returns {string|null}
 * @public
 */

function format (value, options) {
  if (!isBig(value)) {
    return null
  }

  var mag = value.abs()
  var thousandsSeparator = (options && options.thousandsSeparator) || ''
  var unitSeparator = (options && options.unitSeparator) || ''
  var decimalPlaces = (options && options.decimalPlaces !== undefined) ? options.decimalPlaces : 2
  var fixedDecimals = Boolean(options && options.fixedDecimals)
  var unit = (options && options.unit) || ''

  if (!unit || !map[unit.toLowerCase()]) {
    if (mag.gte(map.tb)) {
      unit = 'TB'
    } else if (mag.gte(map.gb)) {
      unit = 'GB'
    } else if (mag.gte(map.mb)) {
      unit = 'MB'
    } else if (mag.gte(map.kb)) {
      unit = 'KB'
    } else {
      unit = 'B'
    }
  }

  var val = value.div(map[unit.toLowerCase()])
  var str = val.toFixed(decimalPlaces)

  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1')
  }

  if (thousandsSeparator) {
    str = str.replace(formatThousandsRegExp, thousandsSeparator)
  }

  return str + unitSeparator + unit
}

/**
 * Parse the string value into a Big in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 *
 * @returns {Big|null}
 * @public
 */

function parse (val) {
  if (typeof val === 'number' && !isNaN(val)) {
    return Big(val)
  }

  if (typeof val !== 'string') {
    return null
  }

  // Test if the string passed is valid
  var results = parseRegExp.exec(val)
  var bigValue
  var unit = 'b'

  if (!results) {
    // Nothing could be extracted from the given string
    bigValue = Big(parseInt(val, 10))
    unit = 'b'
  } else {
    // Retrieve the value and the unit
    bigValue = Big(results[1])
    unit = results[4].toLowerCase()
  }

  return bigValue.times(map[unit]).round(0, 0)
}
