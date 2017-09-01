'use strict'
const {ProductIterable, RangeIterable: {range}} = require('x-iterable')
const {resolve} = require('../../../lib/absolute-url')
const funcCallString = uri => `absoluteURL.resolve(${JSON.stringify(uri)})`
const testList = (uriList, testUnit) => uriList.forEach(testUnit)

const createUnitTester = fn => uri => {
  const expectation = fn(uri)
  test(
    `${funcCallString(uri)} should result ${JSON.stringify(expectation)}`,
    () => void expect(resolve(uri)).toEqual(expectation)
  )
}

const predetermined = (uriList, testUnit) => () => testList(uriList, testUnit)

const randomized = (testUnit, protocols = ['']) => () => {
  for (const [slash, dim] of new ProductIterable('/\\', range(1, 3), range(3))) {
    const vec = range(dim)
    const list = range(3)
      .map(() => vec
        .map(() => Math.random())
        .map(x => x.toString(16))
        .map(x => x.slice(2, 6))
        .join(slash)
      )
    for (const prefix of protocols) {
      testList(list.map(x => prefix + x), testUnit)
    }
  }
}

describe('Resolve absolute URLs', () => {
  const protocols = [
    ...['http', 'https', 'ftp', 'file'].map(x => x + '://'),
    ...['magnet', 'mailto'].map(x => x + ':')
  ]

  const createList = uriList => ProductIterable
    .create(protocols, uriList)
    .map(([prefix, suffix]) => prefix + suffix)

  const testUnit = createUnitTester(url => url.split('\\').join('/'))

  describe(
    'Predetermined',
    predetermined(
      createList(['en.wikipedia.org', 'github.com', 'google.com', 'facebook.com', 'abc.def', 'ghi.jkl']),
      testUnit
    )
  )

  describe('Random Generated', randomized(testUnit, protocols))
})

describe('Resolve absolute POSIX paths', () => {
  const testUnit = createUnitTester(posix => encodeURI('file://' + posix.split('\\').join('/')))

  describe(
    'Predetermined',
    predetermined(
      ['/', '/bin', '/dev/stdout', '/mnt/Mounted Disk/My Documents'],
      testUnit
    )
  )

  describe('Random Generated', randomized(testUnit, ['/']))
})

describe('Resolve absolute MS-Win32 paths', () => {
  const drives = [...'CDE'].map(x => `${x}:\\`)

  const testUnit = createUnitTester(winpath => encodeURI('file:///' + winpath.split('\\').join('/')))

  const predeterminedList = new ProductIterable(
    drives,
    ['Windows\\System', 'Windows\\System32', 'Program Files (x86)']
  ).map(([prefix, suffix]) => prefix + suffix)
  describe('Predetermined', predetermined(predeterminedList, testUnit))

  describe('Random Generated', randomized(testUnit, drives))
})

describe('Resolve relative paths', () => {
  const testUnit = createUnitTester(path => path)

  describe(
    'Predetermined',
    predetermined(
      ['file.txt', 'folder/file.txt', 'folder\\file.txt'],
      testUnit
    )
  )

  describe('Random Generated', randomized(testUnit))
})
