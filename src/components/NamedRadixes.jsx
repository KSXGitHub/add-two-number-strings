import React from 'react'
import NamedValues from './NamedValues.jsx'

const DEFAULT_NAMES = {
  2: 'Binary',
  8: 'Octal',
  10: 'Decimal',
  16: 'Hexadecimal'
}

export const DEFAULT_TEXT_FIELD_PROPS = {
  hintText: 'Radix number'
}

export const DEFAULT_SELECT_FIELD_PROPS = {
  floatingLabelText: 'Radix name'
}

export default class NamedRadixes extends React.Component {
  constructor (props) {
    super(props)

    const {
      radix = 10,
      names = DEFAULT_NAMES,
      onChange = () => {},
      textFieldProps = DEFAULT_TEXT_FIELD_PROPS,
      selectFieldProps = DEFAULT_SELECT_FIELD_PROPS,
      ...rest
    } = props

    this.state = {
      radix,
      names,
      onChange,
      textFieldProps,
      selectFieldProps,
      ...rest
    }
  }

  render () {
    const {radix, names, onChange, ...rest} = this.state

    const namedValues = new Map()
    for (const radix in names) {
      namedValues.set(Number(radix), names[radix])
    }

    return <NamedValues
      value={radix}
      namedValues={namedValues}
      onChange={radix => {
        onChange(radix)
        this.setState({radix})
      }}
      {...rest}
    />
  }
}
