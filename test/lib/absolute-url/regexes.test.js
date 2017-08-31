'use strict'
const {regexes} = require('../../../lib/absolute-url')

describe('Object absoluteURL.regexes', () => {
  const received = Object.keys(regexes).filter(x => /^[a-z_]+$/i.test(x))
  const expectation = ['ABS_URL', 'ABS_POSIX', 'ABS_MSWIN']
  const expectstr = JSON.stringify(expectation)

  test(`should contain ${expectstr}`, () => {
    expect(received).toEqual(expect.arrayContaining(expectation))
  })

  test(`should appear in ${expectstr}`, () => {
    expect(expectation).toEqual(expect.arrayContaining(received))
  })
})

describe('Members of object absoluteURL.regexes', () => {
  for (const key in regexes) {
    const value = regexes[key]
    test(`absoluteURL.regexes.${key} (${value}) should be a RegExp`, () => {
      expect(value).toBeInstanceOf(RegExp)
    })
  }
})
