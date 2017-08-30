'use strict'
const argv = require('process').argv.slice(2)
const {resolve} = require('../../lib/absolute-url')

for (const uri of argv) {
  console.info(resolve(uri))
}
