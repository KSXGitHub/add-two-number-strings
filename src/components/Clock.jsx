import React from 'react'

export default class Clock extends React.Component {
  constructor (props) {
    super(props)

    const {
      refreshRate = 1000,
      format: {
        wrap: Wrap = props => (<span {...props} />),
        content: getContent = date => date.toTimeString()
      } = {},
      display = date => (<span>{getContent(date)}</span>)
    } = props

    this.state = {date: new Date(), display}
    this.refreshRate = parseInt(refreshRate)
  }

  render () {
    return this.state.display(this.state.date)
  }

  componentDidMount () {
    this.timerID = setInterval(() => this.tick(), this.refreshRate)
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
    delete this.timerID
  }

  tick () {
    this.setState({date: new Date()})
  }
}
