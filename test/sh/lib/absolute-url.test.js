'use strict'
const path = require('path')
const {spawnSync} = require('child_process')
const script = path.resolve(__dirname, '../../../sh/lib/absolute-url.js')

const mat = [
  ['Absolute URL', 'https://example.com', 'https://example.com'],
  ['Absolute POSIX', '/mnt/My Mounted Disk/My Documents', 'file:///mnt/My%20Mounted%20Disk/My%20Documents'],
  ['Absolute MSWin32', 'C:\\Users\\My Documents\\My Top Secret', 'file:///C:/Users/My%20Documents/My%20Top%20Secret'],
  ['Relative', 'whatever', 'whatever']
]

const response = spawnSync('node', [script, ...mat.map(vec => vec[1])])
response.stderr && require('process').stderr.write(response.stderr)

test('Child process should return status of 0', () => {
  expect(response.status).toEqual(0)
})

test('Child process should have stdout', () => {
  expect(response.stdout).not.toBe(null)
})

typeof response.stdout === 'string' && describe('Data should match', () => {
  const received = response.stdout.split(/[\n\r]/).map(x => x.trim()).filter(Boolean)
  const expectation = mat.map(vec => vec[2])

  test('Received should contain Expectation', () => {
    expect(received).toEqual(expect.arrayContaining(expectation))
  })

  test('Expectation should contain Received', () => {
    expect(expectation).toEqual(expect.arrayContaining(received))
  })
})
