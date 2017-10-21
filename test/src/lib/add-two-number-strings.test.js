'use strict'
const {RangeIterable, ProductIterable} = require('x-iterable')
const add = require('../../../src/lib/add-two-number-strings')

describe('Correct use-cases', () => {
  const unit = (a, b) => {
    const sum = a + b
    return test(
      `${a} + ${b} === ${sum}`,
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
