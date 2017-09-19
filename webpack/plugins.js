'use strict'
const path = require('path')

const {UglifyJsPlugin} = require('webpack').optimize
const uglifyJsPluginConfig = new UglifyJsPlugin({
  compress: {
    warnings: false
  }
})

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/client/index.html'),
  filename: 'index.html',
  inject: 'body'
})

const CopyWebpackPlugin = require('copy-webpack-plugin')
const copyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: 'node_modules/monaco-editor/min/vs',
    to: 'vs'
  }
])

module.exports = [
  uglifyJsPluginConfig,
  htmlWebpackPluginConfig,
  copyWebpackPluginConfig
]
