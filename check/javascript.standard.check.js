'use strict'
const path = require('path')
const {spawnSync} = require('child_process')
const {
  env: {
    STANDARDJS_EXECUTABLE = 'standard',
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

  const {
    stdout,
    stderr,
    signal,
    error,
    status
  } = spawnSync(STANDARDJS_EXECUTABLE, argv, {cwd: wdir, shell: true})

  if (stdout === null) console.warn('standard.stdout is null')
  if (stderr === null) console.warn('standard.stderr is null')
  if (signal) console.warn(`standard.signal is ${JSON.stringify(signal)}`)
  if (error) throw error
  if (status) throw new Error(stderr + '\n' + stdout)
})
