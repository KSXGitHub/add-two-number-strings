import React from 'react'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Toggle from 'material-ui/Toggle'
import MuiWrapper from './MuiWrapper.jsx'
import RandomNumberForm from './RandomNumberForm.jsx'
import ClockForm from './ClockForm.jsx'
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
      init,
      darkTheme = false
    } = props

    this.state = {init, darkTheme}
  }

  render () {
    const {init, darkTheme} = this.state

    return <MuiWrapper darkTheme={darkTheme}><Paper style={TOP_PAPER_STYLE}>
      <header>
        <AppBar title='Hello, World!!' showMenuIconButton={false} />
      </header>
      <main>
        <RandomNumberForm init={init} />
        <ClockForm darkTheme={darkTheme} />
        <Paper zDepth={0}>
          <Toggle
            label='Dark Theme'
            toggled={darkTheme}
            onToggle={(_, darkTheme) => this.setState({darkTheme})}
          />
        </Paper>
      </main>
      <Footer />
    </Paper></MuiWrapper>
  }
}
