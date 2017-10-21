'use strict'
const add = require('../../../src/lib/add-two-number-strings')

test('Correct use cases', () => {
  const unit = (a, b) =>
    expect(add(String(a), String(b))).toStrictEqual(String(a + b))

  const multipleUnits = array => array.forEach(x => unit(...x))

  test('Same length; Sum of each digit-pair is less than 10', () => multipleUnits([
    [123, 456], [111, 222], [0, 1], [333, 111], [2, 5]
  ]))
})
