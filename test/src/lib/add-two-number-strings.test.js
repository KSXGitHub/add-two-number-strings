'use strict'
const {RangeIterable, ProductIterable} = require('x-iterable')
const add = require('../../../src/lib/add-two-number-strings')

describe('Correct use-cases', () => {
  const strexpr = (a, b) => `add('${a}', '${b}')`
  const strcmpr = (a, b, s) => `${strexpr(a, b)} should be '${s}'`

  const unit = (a, b) => {
    const sum = a + b
    return test(
      strcmpr(a, b, sum),
      () => expect(add(String(a), String(b))).toBe(String(sum))
    )
  }

  const multipleUnits = array => array.forEach(x => unit(...x))

  describe(
    'One-digit numbers',
    () => multipleUnits(
      ProductIterable.pow(RangeIterable.range(10), 2)
    )
  )

  describe(
    'Zero sum',
    () => ProductIterable.pow(['', '0', '00', '000'], 2)
      .forEach(([a, b]) => test(
        strcmpr(a, b, '0'),
        () => expect(add(a, b)).toBe('0')
      ))
  )

  describe(
    'Leading zeros',
    () => ProductIterable.pow(['0', '00', '0012500', '000658', '123'], 2)
      .forEach(([a, b]) => test(
        `${strexpr(a, b)} should not contain leading zeros`,
        () => expect(add(a, b)).not.toMatch(/^0+([^0]|0)/)
      ))
  )

  describe(
    'Same length; Sum of each digit-pair is less than 10',
    () => multipleUnits([
      [123, 456], [111, 222], [0, 1], [333, 111], [2, 5]
    ])
  )

  describe(
    'Same length; Sum of some digit-pairs are greater than or equal to 10',
    () => multipleUnits([
      [99, 11], [288, 112], [789, 111], [2999, 3125], [1122, 9988]
    ])
  )

  describe(
    'Different length; Sum of each digit-pair is less than 10',
    () => multipleUnits([
      [123, 2], [456, 122333], [0, 22553], [15, 654321], [1, 5]
    ])
  )

  describe(
    'Different length; Sum of each digit-pair is greater than 10',
    () => multipleUnits([
      [123, 7], [1999, 2], [6789, 222], [5555, 345], [12, 88888]
    ])
  )
})

describe('Incorrect use-cases', () => {
  const unit = (a, b, error) => test(
    `'${a} + ${b}' should throws ${error ? `match {error}` : 'an error'}`,
    () => expect(() => add(a, b)).toThrow(...error ? [error] : [])
  )

  describe('Use non-digit characters', () => {
    [
      ['+123', '456'],
      ['25-3', '4'],
      ['123', '-12'],
      ['22.5', '88+9'],
      ['abc', 'def']
    ].forEach(x => unit(...x, /Invalid characters:/))
  })

  const nonStrings = [
    {},
    () => {},
    undefined,
    null,
    123
  ]

  describe('', () => {
    nonStrings.forEach((x, i) => unit(x, i, /Must be a string/))
  })
})
