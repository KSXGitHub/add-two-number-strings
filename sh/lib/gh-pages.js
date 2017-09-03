'use strict'
const {resolve} = require('path')
const {exit} = require('process')
const ghpages = require('gh-pages')

ghpages.publish(
  resolve(__dirname, '../../dist'),
  {
    dotfiles: true,
    message: 'Update using gh-pages'
  },
  error => {
    if (!error) return
    console.error(error)
    exit(1)
  }
)
