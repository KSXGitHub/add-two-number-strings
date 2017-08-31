import React from 'react'

function createMockedComponent () {
  return class MockedComponent extends React.Component {
    render () {
      return <mocked-component {...this.props} />
    }
  }
}

; [
  'material-ui/styles/MuiThemeProvider',
  'material-ui/styles/baseThemes/darkBaseTheme',
  'material-ui/AppBar',
  'material-ui/Paper'
].forEach(moduleName =>
  jest.doMock(moduleName, createMockedComponent)
)

jest.doMock('material-ui/styles/getMuiTheme', () => jest.fn(theme => ({theme})))
