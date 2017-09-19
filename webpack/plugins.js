'use strict'
const path = require('path')

const {UglifyJsPlugin} = require('webpack').optimize
const uglifyJsPluginConfig = new UglifyJsPlugin({
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

const CopyPlugin = require('copy-webpack-plugin')
const copyPluginConfig = new CopyPlugin([
  {
    from: 'node_modules/monaco-editor/min/vs',
    to: 'vs'
  }
])

module.exports = [
  uglifyJsPluginConfig,
  htmlPluginConfig,
  copyPluginConfig
]
