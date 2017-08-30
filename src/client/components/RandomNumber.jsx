import React from 'react'

export default class RandomNumber extends React.Component {
  constructor (props) {
    super(props)
    const {display = String, init = Math.random} = props
    const value = init()
    const displayValue = () => display(value)
    this.state = {displayValue}
  }

  render () {
    return <div>
      <span className='label'>Random Number: </span>
      <span className='value'>{this.state.displayValue()}</span>
    </div>
  }
}
