'use strict'
const {spawn} = require('child_process')

test('JavaScript Code Style: StandardJS', async () => {
  let stdout = ''
  let stderr = ''

  const child = spawn('standard')
  child.stdout.on('data', data => { stdout += data })
  child.stderr.on('data', data => { stderr += data })

  const status = await new Promise(
    resolve => child.on('exit', status => resolve(status))
  )

  if (status) {
    throw new Error(stderr + '\n' + stdout)
  }
})
