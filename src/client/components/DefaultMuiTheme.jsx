import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {darkBaseTheme as defaultTheme} from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default function DefaultMuiTheme (props) {
  return <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>
    {props.children}
  </MuiThemeProvider>
}
