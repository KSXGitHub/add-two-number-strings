'use strict'
const {ProductIterable} = require('x-iterable')
const {testers} = require('../../../lib/absolute-url')
const fnNames = Object.keys(testers).filter(x => /^is[A-Z]/.test(x))
const random = () => Math.random().toString(16).slice(2, 18)

const map = [
  [
    [
      'http://example.com',
      'ftp://example.org/file',
      `magnet:${random()}`
    ],
    [
      'isAbsURL',
      'isAbsolute'
    ]
  ],
  [
    [
      '/',
      '/dev',
      `/home/${random()}`
    ],
    [
      'isAbsPOSIX',
      'isAbsolute'
    ]
  ],
  [
    [
      'C:\\',
      'C:\\Windows',
      `C:\\Users\\User_${random()}`
    ],
    [
      'isAbsMSWindows',
      'isAbsolute'
    ]
  ],
  [
    [
      'foo/bar',
      'hello\\world',
      random()
    ],
    [
      'isRelative'
    ]
  ]
]

for (const [uriList, fnList] of map) {
  const uriListJSON = JSON.stringify(uriList)
  const fnListJSON = JSON.stringify(fnList)

  describe(`${uriListJSON} should satify every of ${fnListJSON}`, () => {
    for (const [uri, fname] of new ProductIterable(uriList, fnList)) {
      const fn = testers[fname]
      test(`absoluteURL.testers.${fname}(${JSON.stringify(uri)}) should return true`, () => {
        expect(fn(uri)).toEqual(true)
      })
    }
  })

  const negFnList = fnNames.filter(fname => !fnList.includes(fname))
  const negFnListJSON = JSON.stringify(negFnList)

  describe(`${uriListJSON} should not satify any of ${negFnListJSON}`, () => {
    for (const [uri, fname] of new ProductIterable(uriList, negFnList)) {
      const fn = testers[fname]
      test(`absoluteURL.testers.${fname}(${JSON.stringify(uri)}) should return false`, () => {
        expect(fn(uri)).toEqual(false)
      })
    }
  })
}
