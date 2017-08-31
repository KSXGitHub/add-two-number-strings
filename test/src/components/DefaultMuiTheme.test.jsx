import './__lib__/material-ui-mocks.jsx'
import React from 'react'
import renderer from 'react-test-renderer'
import DefaultMuiTheme from '../../../src/components/DefaultMuiTheme.jsx'

test('Snapshot: components/DefaultMuiTheme.jsx', () => {
  const tree = renderer.create(<DefaultMuiTheme><div /></DefaultMuiTheme>).toJSON()
  expect(tree).toMatchSnapshot()
})
