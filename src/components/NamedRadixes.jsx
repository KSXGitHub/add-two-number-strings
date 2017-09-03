import React from 'react'
import NamedValues from './NamedValues.jsx'

const DEFAULT_NAMES = {
  2: 'Binary',
  8: 'Octal',
  10: 'Decimal',
  16: 'Hexadecimal'
}

export default class NamedRadixes extends React.Component {
  constructor (props) {
    super(props)

    const {
      radix = 10,
      names = DEFAULT_NAMES,
      onChange = () => {},
      ...rest
    } = props

    this.state = {radix, names, onChange, ...rest}
  }

  render () {
    const {radix, names, ...rest} = this.state

    const namedValues = new Map()
    for (const radix in names) {
      namedValues.set(Number(radix), names[radix])
    }

    return <NamedValues
      value={radix}
      namedValues={namedValues}
      onChange={radix => {
        this.state.onChange(radix)
        this.setState({radix})
      }}
      {...rest}
    />
  }
}
