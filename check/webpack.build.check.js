'use strict'
const main = require('./lib/test-spawn')

main({
  alwaysPrintStdIO: true,
  defaultExecutable: 'webpack',
  envPrefix: 'WEBPACK'
})
