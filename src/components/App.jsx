import React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiWrapper from './MuiWrapper.jsx'
import RandomNumberForm from './RandomNumberForm.jsx'
import ClockForm from './ClockForm.jsx'
import Footer from './Footer.jsx'

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

    return <MuiWrapper darkTheme={darkTheme}><div>
      <header>
        <AppBar title='Hello, World!!' showMenuIconButton={false} />
      </header>
      <main>
        <RandomNumberForm init={init} />
        <ClockForm />
      </main>
      <Footer />
    </div></MuiWrapper>
  }
}
