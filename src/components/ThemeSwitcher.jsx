import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline'

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

    const icon = <ActionLightbulbOutline />

    return <FlatButton
      label={label}
      onClick={() => {
        const newValue = !value
        this.setState({value: newValue})
        onChange(newValue, value)
      }}
      icon={icon}
      {...buttonProps}
    />
  }
}
