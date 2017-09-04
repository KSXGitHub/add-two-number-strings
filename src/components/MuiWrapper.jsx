import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class MuiWrapper extends React.Component {
  constructor (props) {
    super(props)

    const {
      darkTheme = false,
      ...rest
    } = props

    this.state = {darkTheme, ...rest}
  }

  render () {
    const {
      children,
      darkTheme
    } = this.state

    return <MuiThemeProvider
      muiTheme={getMuiTheme(darkTheme ? darkBaseTheme : lightBaseTheme)}
    >
      {children}
    </MuiThemeProvider>
  }
}
