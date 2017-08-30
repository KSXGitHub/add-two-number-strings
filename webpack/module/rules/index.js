'use strict'
const path = require('path')
const {readFileSync, readdirSync} = require('fs')
const yaml = require('js-yaml')
const regexes = require('../../lib/regexes')
const {exclude} = regexes

const loadYamlFile = filename =>
  yaml.safeLoad(readFileSync(filename, 'utf8'))

const dataUse = path.resolve(__dirname, 'data/use')

const rules = readdirSync(dataUse)
  .map(item => path.resolve(dataUse, item))
  .map(file => [path.parse(file).name, loadYamlFile(file)])
  .map(([name, use]) => ({test: regexes[name], use, exclude}))

module.exports = rules
