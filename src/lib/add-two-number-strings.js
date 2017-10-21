'use strict'

function add (left, right) {
  if (!right.length) return left
  if (left.length < right.length) return add(right, left)

  const lastLeft = parseInt(left.slice(-1))
  const lastRight = parseInt(right.slice(-1))
  const lastTotal = lastLeft + lastRight
  const next = add(left.slice(0, -1), right.slice(0, -1))
  const prefix = lastTotal < 10 ? next : add(next, '1')
  const suffix = String(lastTotal).slice(-1)

  return prefix + suffix
}

function validate (string) {
  if (typeof string !== 'string') {
    throw new TypeError('Must be a string')
  }

  const invalid = Array.from(string)
    .filter(x => x < '0' || x > '9')

  if (invalid.length) {
    throw new TypeError(`Invalid characters: ${[...new Set(invalid)].join(', ')}`)
  }

  return string
}

module.exports = (left, right) =>
  add(validate(left), validate(right)).replace(/^0+/, '') || '0'
