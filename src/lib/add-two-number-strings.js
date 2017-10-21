'use strict'

function add (left, right) {
  return Number(left) + Number(right)
}

function validate (string) {
  if (typeof string !== 'string') {
    throw new TypeError('Must be a string')
  }

  const invalid = Array.from(string)
    .filter(x => x < '0' || x > '9')

  if (invalid.length) {
    throw new TypeError(`Invalid characters: ${invalid.join(', ')}`)
  }

  return string
}

module.exports = (left, right) => add(validate(left), validate(right))
