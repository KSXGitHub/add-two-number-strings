import React from 'react'
import '../../../../lib/native-js-mocks'

function createMockedComponent () {
  return class MockedComponent extends React.Component {
    render () {
      return <mocked-component {...this.props} />
    }
  }
}

function createMockedComponentSuite (moduleName) {
  const realModule = require(moduleName)
  const defaultExport = realModule._default

  const keys = Object.keys(realModule)
    .filter(key => typeof key === 'string')
    .filter(key => /^[A-Z][a-zA-Z0-9]+$/.test(key))
    .filter(key => typeof realModule[key] === 'function')

  const suite = keys.reduce(
    (object, key) =>
      ({[key]: createMockedComponent(), ...object}),
    {}
  )

  const defaultKey = keys.find(key => realModule[key] === defaultExport)
  const defaultComponent = defaultKey ? suite[defaultKey] : createMockedComponent()
  const MockedComponentSuite = Object.assign(defaultComponent, suite)
  return () => MockedComponentSuite
}

; [
  'material-ui/styles/MuiThemeProvider',
  'material-ui/styles/baseThemes/darkBaseTheme',
  'material-ui/AppBar',
  'material-ui/Paper',
  'material-ui/TextField',
  'material-ui/Toggle',
  'material-ui/Checkbox',
  'material-ui/Slider',
  'material-ui/Card',
  'material-ui/SelectField',
  'material-ui/MenuItem'
].forEach(moduleName =>
  jest.doMock(moduleName, createMockedComponentSuite(moduleName))
)

jest.doMock('material-ui/styles/getMuiTheme', () => jest.fn(theme => ({theme})))
