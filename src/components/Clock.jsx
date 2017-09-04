import React from 'react'

const DEFAULT_WRAP = props => (<span {...props} />)
const DEFAULT_CONTENT = date => date.toTimeString()

export default class Clock extends React.Component {
  constructor (props) {
    super(props)

    const {
      refreshDuration = 1000,
      format: {
        wrap: Wrap = DEFAULT_WRAP,
        content: getContent = DEFAULT_CONTENT
      } = {},
      display = date => (<Wrap>{getContent(date)}</Wrap>)
    } = props

    this.state = {
      refreshDuration: parseInt(refreshDuration),
      date: new Date(),
      display
    }
  }

  render () {
    return this.state.display(this.state.date)
  }

  componentDidMount () {
    this.beginInterval()
  }

  componentWillUnmount () {
    clearTimeout(this.timerID)
    delete this.timerID
  }

  tick () {
    this.setState({date: new Date()})
  }

  beginInterval () {
    this.timerID = setTimeout(() => {
      this.tick()
      this.beginInterval()
    }, this.state.refreshDuration)
  }
}
