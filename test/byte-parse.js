'use strict'
/* eslint-env mocha */

var assert = require('assert')
var bytes = require('..')

describe('Test byte parse function', function () {
  it('Should return null if input is invalid', function () {
    assert.strictEqual(bytes.parse(undefined), null)
    assert.strictEqual(bytes.parse(null), null)
    assert.strictEqual(bytes.parse(true), null)
    assert.strictEqual(bytes.parse(false), null)
    assert.strictEqual(bytes.parse(NaN), null)
    assert.strictEqual(bytes.parse(function () {}), null)
    assert.strictEqual(bytes.parse({}), null)
  })

  it('Should parse raw number', function () {
    assert(bytes.parse(0).eq(0))
    assert(bytes.parse(-1).eq(-1))
    assert(bytes.parse(1).eq(1))
    assert(bytes.parse(10.5).eq(10.5))
  })

  it('Should parse KB', function () {
    assert(bytes.parse('1kb').eq(1 * Math.pow(1024, 1)))
    assert(bytes.parse('1KB').eq(1 * Math.pow(1024, 1)))
    assert(bytes.parse('1Kb').eq(1 * Math.pow(1024, 1)))
    assert(bytes.parse('1kB').eq(1 * Math.pow(1024, 1)))

    assert(bytes.parse('0.5kb').eq(0.5 * Math.pow(1024, 1)))
    assert(bytes.parse('0.5KB').eq(0.5 * Math.pow(1024, 1)))
    assert(bytes.parse('0.5Kb').eq(0.5 * Math.pow(1024, 1)))
    assert(bytes.parse('0.5kB').eq(0.5 * Math.pow(1024, 1)))

    assert(bytes.parse('1.5kb').eq(1.5 * Math.pow(1024, 1)))
    assert(bytes.parse('1.5KB').eq(1.5 * Math.pow(1024, 1)))
    assert(bytes.parse('1.5Kb').eq(1.5 * Math.pow(1024, 1)))
    assert(bytes.parse('1.5kB').eq(1.5 * Math.pow(1024, 1)))
  })

  it('Should parse MB', function () {
    assert(bytes.parse('1mb').eq(1 * Math.pow(1024, 2)))
    assert(bytes.parse('1MB').eq(1 * Math.pow(1024, 2)))
    assert(bytes.parse('1Mb').eq(1 * Math.pow(1024, 2)))
    assert(bytes.parse('1mB').eq(1 * Math.pow(1024, 2)))
  })

  it('Should parse GB', function () {
    assert(bytes.parse('1gb').eq(1 * Math.pow(1024, 3)))
    assert(bytes.parse('1GB').eq(1 * Math.pow(1024, 3)))
    assert(bytes.parse('1Gb').eq(1 * Math.pow(1024, 3)))
    assert(bytes.parse('1gB').eq(1 * Math.pow(1024, 3)))
  })

  it('Should parse TB', function () {
    assert(bytes.parse('1tb').eq(1 * Math.pow(1024, 4)))
    assert(bytes.parse('1TB').eq(1 * Math.pow(1024, 4)))
    assert(bytes.parse('1Tb').eq(1 * Math.pow(1024, 4)))
    assert(bytes.parse('1tB').eq(1 * Math.pow(1024, 4)))

    assert(bytes.parse('0.5tb').eq(0.5 * Math.pow(1024, 4)))
    assert(bytes.parse('0.5TB').eq(0.5 * Math.pow(1024, 4)))
    assert(bytes.parse('0.5Tb').eq(0.5 * Math.pow(1024, 4)))
    assert(bytes.parse('0.5tB').eq(0.5 * Math.pow(1024, 4)))

    assert(bytes.parse('1.5tb').eq(1.5 * Math.pow(1024, 4)))
    assert(bytes.parse('1.5TB').eq(1.5 * Math.pow(1024, 4)))
    assert(bytes.parse('1.5Tb').eq(1.5 * Math.pow(1024, 4)))
    assert(bytes.parse('1.5tB').eq(1.5 * Math.pow(1024, 4)))
  })

  it('Should assume bytes when no units', function () {
    assert(bytes.parse('0').eq(0))
    assert(bytes.parse('-1').eq(-1))
    assert(bytes.parse('1024').eq(1024))
    // "hexadecimal literal strings, e.g. '0xff', are not valid."
    // > http://mikemcl.github.io/big.js/#big
    // assert(bytes.parse('0x11').eq(0))
  })

  it('Should accept negative values', function () {
    assert(bytes.parse('-1').eq(-1))
    assert(bytes.parse('-1024').eq(-1024))
    assert(bytes.parse('-1.5TB').eq(-1.5 * Math.pow(1024, 4)))
  })

  it('Should drop partial bytes', function () {
    assert(bytes.parse('1.1b').eq(1))
    assert(bytes.parse('1.0001kb').eq(1024))
  })

  it('Should allow whitespace', function () {
    assert(bytes.parse('1 TB').eq(1 * Math.pow(1024, 4)))
  })
})
