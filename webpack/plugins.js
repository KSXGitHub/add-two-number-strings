'use strict'
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/client/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = [
  HtmlWebpackPluginConfig
]
