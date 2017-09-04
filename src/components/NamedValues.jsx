import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class NamedValues extends React.Component {
  constructor (props) {
    super(props)

    const {
      value,
      namedValues = new Map(),
      defaultName = '',
      onChange = () => {},
      textFieldGetValue = x => x,
      textFieldSetValue = x => x,
      textFieldProps = {},
      selectFieldProps = {},
      createMenuItemProps = () => ({}),
      container = props => (<div {...props} />)
    } = props

    this.state = {
      onChange,
      textFieldGetValue,
      textFieldSetValue,
      textFieldProps,
      selectFieldProps,
      createMenuItemProps,
      container,
      ...this.createState(value, namedValues, defaultName)
    }
  }

  render () {
    const {
      onChange,
      value,
      namedValues,
      defaultName,
      textFieldGetValue,
      textFieldSetValue,
      textFieldProps,
      selectFieldProps,
      createMenuItemProps,
      container: Container
    } = this.state

    const handleChange = value => {
      let prevent = false

      onChange(value, {
        preventDefault: () => { prevent = true }
      })

      prevent || this.setState(
        this.createState(value, namedValues, defaultName)
      )
    }

    return <Container>
      <div><TextField
        name='anonymous-value'
        value={textFieldSetValue(value)}
        onChange={(_, value) => handleChange(textFieldGetValue(value))}
        {...textFieldProps}
      /></div>

      <div><SelectField
        name='named-value'
        value={value}
        onChange={(_, __, value) => handleChange(value)}
        {...selectFieldProps}
      >{
        Array.from(namedValues)
          .map(([value, name]) => (<MenuItem
            value={value}
            primaryText={name}
            key={name}
            {...createMenuItemProps({value, name})}
          />))
      }</SelectField></div>
    </Container>
  }

  createState (value, namedValues, defaultName) {
    const name = namedValues.has(value)
      ? namedValues.get(value)
      : defaultName

    return {
      value,
      namedValues,
      defaultName,
      name
    }
  }
}
