import './__lib__/material-ui-mocks.jsx'
import '../../../lib/native-js-mocks'
import React from 'react'
import renderer from 'react-test-renderer'
import Clock from '../../../src/components/Clock.jsx'

describe('Snapshot: components/Clock.jsx', () => {
  const display = date => (<p>{String(date)}</p>)
  const wrap = props => (<p {...props} />)
  const content = date => String(date)

  const suite = {
    'props = {}': (<Clock />),
    'props = {display}': (<Clock
      display={display}
    />),
    'props.format = {wrap}': (<Clock
      format={{wrap}}
    />),
    'props.format = {content}': (<Clock
      format={{content}}
    />),
    'props.format = {wrap, content}': (<Clock
      format={{wrap, content}}
    />)
  }

  for (const title in suite) {
    test(title, () => {
      const tree = renderer.create(suite[title]).toJSON()
      expect(tree).toMatchSnapshot()
    })
  }
})
