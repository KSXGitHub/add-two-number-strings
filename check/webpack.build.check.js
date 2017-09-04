'use strict'
const {WEBPACK_DONT_ALWAYS_PRINT_STDIO = 'false'} = require('process').env
const main = require('./lib/test-spawn')

main({
  alwaysPrintStdIO: WEBPACK_DONT_ALWAYS_PRINT_STDIO !== 'true',
  defaultExecutable: 'webpack',
  envMiddleName: 'WEBPACK'
})
