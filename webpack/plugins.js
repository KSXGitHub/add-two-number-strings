'use strict'
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/client/index.html'),
  filename: 'index.html',
  inject: 'body'
})

const CopyWebpackPlugin = require('copy-webpack-plugin')
const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: 'node_modules/monaco-editor/min/vs',
    to: 'vs'
  }
])

module.exports = [
  HtmlWebpackPluginConfig,
  copyWebpackPlugin
]
