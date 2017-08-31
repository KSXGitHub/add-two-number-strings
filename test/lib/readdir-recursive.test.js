'use strict'
const path = require('path')
const fs = require('fs')
const {readdirRecursiveSync} = require('../../lib/readdir-recursive')
const datadir = path.join(__dirname, '__data__/readdir-recursive/dir')
const listfile = path.join(__dirname, '__data__/readdir-recursive/list')

const expectation = fs
  .readFileSync(listfile, 'utf8')
  .split(/\n|\r/)
  .filter(Boolean)
  .map(x => path.resolve(datadir, x))

const iterable = readdirRecursiveSync(datadir)

describe(`readdirRecursiveSync('${datadir}')`, () => {
  const array = iterable.to(Array)

  test(`should contain every line of file '${listfile}'`, () => {
    expectation.forEach(line => expect(array).toContain(line))
  })

  test(`should appear in every line of file ${listfile}`, () => {
    array.forEach(item => expect(expectation).toContain(item))
  })
})
