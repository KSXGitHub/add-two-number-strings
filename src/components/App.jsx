import React from 'react'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import MuiWrapper from './MuiWrapper.jsx'
import Calculator from './Calculator.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'
import Footer from './Footer.jsx'

export const TOP_PAPER_STYLE = {
  height: '100%',
  padding: 0,
  border: 0,
  margin: 0
}

export default class App extends React.Component {
  constructor (props) {
    super(props)

    const {
      darkTheme = false
    } = props

    this.state = {darkTheme}
  }

  render () {
    const {darkTheme} = this.state

    return <MuiWrapper darkTheme={darkTheme}><Paper style={TOP_PAPER_STYLE}>
      <header>
        <AppBar position='static'><Toolbar>
          <Typography type='title' color='inherit'>
            Add two number strings
          </Typography>
        </Toolbar></AppBar>
      </header>
      <main>
        <Paper>
          <Calculator />
          <ThemeSwitcher
            value={darkTheme}
            onChange={darkTheme => this.setState({darkTheme})}
            buttonProps={{fullWidth: true}}
          />
        </Paper>
      </main>
      <Footer />
    </Paper></MuiWrapper>
  }
}
