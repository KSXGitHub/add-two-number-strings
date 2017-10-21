'use strict'
const path = require('path')

const {UglifyJsPlugin} = require('webpack').optimize
const uglifyJsPluginConfig = new UglifyJsPlugin({
  sourceMap: true,
  compress: {
    warnings: false
  }
})

const HtmlPlugin = require('html-webpack-plugin')
const htmlPluginConfig = new HtmlPlugin({
  template: path.resolve(__dirname, '../src/client/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = [
  uglifyJsPluginConfig,
  htmlPluginConfig
]
