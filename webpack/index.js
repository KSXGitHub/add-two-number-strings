'use strict'
const path = require('path')
const {statSync} = require('fs')
const {readdirRecursiveSync} = require('../lib/readdir-recursive')
const regexes = require('./lib/regexes')
const BUILD_DIR = path.resolve(__dirname, '../dist')
const APP_DIR = path.resolve(__dirname, '../src/client')
const APP_FILES = readdirRecursiveSync(APP_DIR).to(Array)

const config = {
  entry: APP_FILES
    .filter(file => statSync(file).isFile())
    .filter(file => regexes.javascript.test(file)),
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: require('./module'),
  plugins: require('./plugins.js')
}

module.exports = config
