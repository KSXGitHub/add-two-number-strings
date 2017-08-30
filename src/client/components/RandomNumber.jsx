import React from 'react'
import Paper from 'material-ui/Paper'

export default class RandomNumber extends React.Component {
  constructor (props) {
    super(props)
    const {display = String, init = Math.random} = props
    const value = init()
    const displayValue = () => display(value)
    this.state = {displayValue}
  }

  render () {
    return <Paper zDepth={0}>
      <span className='label'>Random Number: </span>
      <span className='value'>{this.state.displayValue()}</span>
    </Paper>
  }
}
