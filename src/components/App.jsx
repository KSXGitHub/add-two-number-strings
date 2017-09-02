import React from 'react'
import AppBar from 'material-ui/AppBar'
import DefaultMuiTheme from './DefaultMuiTheme.jsx'
import RandomNumberForm from './RandomNumberForm.jsx'
import ClockForm from './ClockForm.jsx'

export default function App ({init}) {
  return <DefaultMuiTheme><div>
    <AppBar title='Hello, World!!' showMenuIconButton={false} />
    <RandomNumberForm init={init} />
    <ClockForm />
  </div></DefaultMuiTheme>
}
