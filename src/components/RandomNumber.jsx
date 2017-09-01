import React from 'react'
import Paper from 'material-ui/Paper'

export default class RandomNumber extends React.Component {
  constructor (props) {
    super(props)
    const {display = String, init = Math.random, style = {}, label = 'Random Number'} = props
    const value = init()
    const displayValue = () => display(value)
    this.state = {displayValue, style, label}
  }

  render () {
    const {
      label,
      style: {
        label: labelStyle = {},
        value: valueStyle = {}
      }
    } = this.state

    return <Paper zDepth={0}>
      {label
        ? <span className='label' style={labelStyle}>
          {label}:&nbsp;
        </span>
        : null
      }
      <span className='value' style={valueStyle}>
        {this.state.displayValue()}
      </span>
    </Paper>
  }
}
