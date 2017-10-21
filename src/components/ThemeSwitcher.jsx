import React from 'react'
import Button from 'material-ui/Button'

export default class ThemeSwitcher extends React.Component {
  constructor (props) {
    super(props)

    const {
      value = false,
      onChange = () => {}
    } = props

    this.state = {
      value,
      onChange
    }
  }

  render () {
    const {
      props: {
        buttonProps = {}
      },
      state: {
        value,
        onChange
      }
    } = this

    const label = value
      ? 'Let there be light!' // Dark → Light
      : "I'm Batman!" // Light → Dark

    return <Button
      onClick={() => {
        const newValue = !value
        this.setState({value: newValue})
        onChange(newValue, value)
      }}
      {...buttonProps}
    >
      {label}
    </Button>
  }
}
