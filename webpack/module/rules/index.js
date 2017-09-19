'use strict'
const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

module.exports = yaml.load(
  fs.readFileSync(
    path.resolve(__dirname, 'data.yaml'),
    'utf8'
  )
)
