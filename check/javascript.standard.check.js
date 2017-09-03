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

test('JavaScript Code Style: StandardJS', () => {
  if (SKIP_CODE_STYLE_CHECKING === 'true') return

  const argv = STANDARDJS_ARGV
    ? JSON.parse(STANDARDJS_ARGV)
    : []

  expect(argv).toBeInstanceOf(Array)

  const {stdout, stderr, status, error} = spawnSync(STANDARDJS_EXECUTABLE || 'standard', argv, {cwd: wdir})

  if (stdout === null) console.warn('standard.stdout is null')
  if (stderr === null) console.warn('standard.stderr is null')

  if (error) {
    throw error
  }

  if (status) {
    throw new Error(stderr + '\n' + stdout)
  }
})
