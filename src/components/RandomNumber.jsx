import React from 'react'
import Paper from 'material-ui/Paper'

export default class RandomNumber extends React.Component {
  constructor (props) {
    super(props)
    const {display = String, init = Math.random, style = {}} = props
    const value = init()
    const displayValue = () => display(value)
    this.state = {displayValue, style}
  }

  render () {
    const {
      label: labelStyle = {},
      value: valueStyle = {}
    } = this.state.style

    return <Paper zDepth={0}>
      <span className='label' style={labelStyle}>
        Random Number:&nbsp;
      </span>
      <span className='value' style={valueStyle}>
        {this.state.displayValue()}
      </span>
    </Paper>
  }
}
