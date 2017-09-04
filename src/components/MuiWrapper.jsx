import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class MuiWrapper extends React.Component {
  render () {
    const {
      darkTheme,
      children,
      ...rest
    } = this.props

    return <MuiThemeProvider
      muiTheme={getMuiTheme(darkTheme ? darkBaseTheme : lightBaseTheme)}
      {...rest}
    >
      {children}
    </MuiThemeProvider>
  }
}
