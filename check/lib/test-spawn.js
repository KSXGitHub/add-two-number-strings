'use strict'

function main ({
  path = require('path'),
  childProcess: {spawnSync} = require('child_process'),
  process: {env} = require('process'),
  defaultExecutable = 'echo',
  envPrefix = ''
} = {}) {
  const {
    [`${envPrefix}_EXECUTABLE`]: executable = defaultExecutable,
    [`${envPrefix}_ARGV`]: spawnArguments = '[]',
    [`${envPrefix}_SKIP`]: skipSpawnTesting
  } = env

  const wdir = path.resolve(__dirname, '..')

  test('JavaScript Code Style: StandardJS', () => {
    if (skipSpawnTesting === 'true') return

    expect(argv).toBeInstanceOf(Array)

    const {
      stdout,
      stderr,
      signal,
      error,
      status
    } = spawnSync(executable, argv, {cwd: wdir, shell: true})

    if (stdout === null) console.warn('respose.stdout is null')
    if (stderr === null) console.warn('respose.stderr is null')
    if (signal) console.warn(`respose.signal is ${JSON.stringify(signal)}`)
    if (error) throw error
    if (status) throw new Error(stderr + '\n' + stdout)
  })
}

module.exports = main
