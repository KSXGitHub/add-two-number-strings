import React from 'react'
import AppBar from 'material-ui/AppBar'
import DefaultMuiTheme from './DefaultMuiTheme.jsx'
import RandomNumber from './RandomNumber.jsx'

export default function App ({init}) {
  const display = num =>
    parseFloat(num).toString(16).slice(2, 18).toUpperCase()

  return <DefaultMuiTheme><div>
    <AppBar title='Hello, World!!' />
    <RandomNumber display={display} init={init} />
  </div></DefaultMuiTheme>
}
