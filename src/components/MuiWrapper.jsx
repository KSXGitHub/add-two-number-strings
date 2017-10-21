import React from 'react'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

const theme = ['dark', 'light']
  .map(type => ({[type]: createMuiTheme({palette: {type}})}))
  .reduce((prev, current) => Object.assign(prev, current), {})

export default function MuiWrapper (props) {
  const {
    darkTheme,
    children,
    ...rest
  } = props

  return <MuiThemeProvider
    theme={theme[darkTheme ? 'dark' : 'light']}
    {...rest}
  >
    {children}
  </MuiThemeProvider>
}
