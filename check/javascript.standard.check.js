'use strict'
const path = require('path')
const {spawnSync} = require('child_process')
const {
  env: {
    STANDARDJS_EXECUTABLE,
    STANDARDJS_ARGV,
    SKIP_CODE_STYLE_CHECKING
  }
} = require('process')

const wdir = path.resolve(__dirname, '..')

SKIP_CODE_STYLE_CHECKING !== 'true' && test('JavaScript Code Style: StandardJS', () => {
  const argv = STANDARDJS_ARGV
    ? JSON.parse(STANDARDJS_ARGV)
    : []

  expect(argv).toBeInstanceOf(Array)

  const {stdout, stderr, status} = spawnSync(STANDARDJS_EXECUTABLE || 'standard', argv, {cwd: wdir})
  if (status) {
    if (stdout === null) console.warn('standard.stdout is null')
    if (stderr === null) console.warn('standard.stderr is null')
    throw new Error(stderr + '\n' + stdout)
  }
})
