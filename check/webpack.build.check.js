'use strict'
const main = require('./lib/test-spawn')

main({
  defaultExecutable: 'webpack',
  envPrefix: 'WEBPACK'
})
