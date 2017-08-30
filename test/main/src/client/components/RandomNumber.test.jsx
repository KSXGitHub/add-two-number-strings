import React from 'react'
import renderer from 'react-test-renderer'
import RandomNumber from '../../../../../src/client/components/RandomNumber.jsx'
import DefaultMuiTheme from '../../../../../src/client/components/DefaultMuiTheme.jsx'

function WrappedRandomNumber (props) {
  return <DefaultMuiTheme>
    <RandomNumber {...props} />
  </DefaultMuiTheme>
}

describe('Snapshot: components/RandomNumber.jsx', () => {
  const init = () => 0.123456789

  test('with default display function', () => {
    const tree = renderer.create(<WrappedRandomNumber init={init} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with specified display function', () => {
    ; [
      value => JSON.stringify({value}),
      value => Number(value).toString(16).slice(2, 16),
      value => Number(value).toString(36).slice(2, 13),
      value => value * value,
      value => [0, 1, 2, 3].map(x => value * x).join(', ')
    ]
      .map(display => (<WrappedRandomNumber init={init} display={display} />))
      .map(element => renderer.create(element))
      .map(instance => instance.toJSON())
      .forEach(tree => expect(tree).toMatchSnapshot())
  })
})
