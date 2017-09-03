'use strict'
const path = require('path')
const {spawn} = require('child_process')
const {
  env: {
    STANDARDJS_EXECUTABLE,
    STANDARDJS_ARGV,
    SKIP_CODE_STYLE_CHECKING
  }
} = require('process')

const wdir = path.resolve(__dirname, '..')

SKIP_CODE_STYLE_CHECKING !== 'true' && test('JavaScript Code Style: StandardJS', async () => {
  let stdout = ''
  let stderr = ''

  const argv = STANDARDJS_ARGV
    ? JSON.parse(STANDARDJS_ARGV)
    : []

  expect(argv).toBeInstanceOf(Array)

  const child = spawn(STANDARDJS_EXECUTABLE || 'standard', argv, {cwd: wdir})
  child.stdout.on('data', data => { stdout += data })
  child.stderr.on('data', data => { stderr += data })

  const status = await new Promise(
    resolve => child.on('exit', status => resolve(status))
  )

  if (status) {
    throw new Error(stderr + '\n' + stdout)
  }
})
