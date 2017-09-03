import React from 'react'
import AppBar from 'material-ui/AppBar'
import DefaultMuiTheme from './DefaultMuiTheme.jsx'
import RandomNumberForm from './RandomNumberForm.jsx'
import ClockForm from './ClockForm.jsx'
import Footer from './Footer.jsx'

export default function App ({init}) {
  return <DefaultMuiTheme><div>
    <header>
      <AppBar title='Hello, World!!' showMenuIconButton={false} />
    </header>
    <main>
      <RandomNumberForm init={init} />
      <ClockForm />
    </main>
    <Footer />
  </div></DefaultMuiTheme>
}
