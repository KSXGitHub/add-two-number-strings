import './__lib__/material-ui-mocks.jsx'
import React from 'react'
import renderer from 'react-test-renderer'
import ClockForm from '../../../src/components/ClockForm.jsx'

test('Snapshot: components/ClockForm.jsx', () => {
  const tree = renderer.create(<ClockForm />).toJSON()
  expect(tree).toMatchSnapshot()
})
