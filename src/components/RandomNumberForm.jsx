import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RandomNumber from './RandomNumber.jsx'

export default class RandomNumberForm extends React.Component {
  constructor (props) {
    super(props)

    const {
      begin = 0,
      end = 13,
      uppercase = true,
      defaultContent = <i>(Empty)</i>,
      init
    } = props

    this.state = {
      begin,
      end,
      uppercase,
      defaultContent,
      init
    }
  }

  render () {
    const getText = float => (
      (parseFloat(float)
        .toString(16)
        .slice(2)
        .slice(this.state.begin, this.state.end)
      )[this.state.uppercase ? 'toUpperCase' : 'toLowerCase']()
    ) || this.state.defaultContent

    return <Paper zDepth={1}><div>
      <div className='text-field-container'>
        <TextField
          hintText='From...'
          value={this.state.begin}
          onChange={(_, begin) => this.setState({begin})}
        />

        <TextField
          hintText='To...'
          value={this.state.end}
          onChange={(_, end) => this.setState({end})}
        />

        <Checkbox
          label='UpperCase'
          checked={this.state.uppercase}
          onCheck={(_, uppercase) => this.setState({uppercase})}
          style={{marginBottom: 16}}
          labelPosition='right'
        />
      </div>

      <div className='output-container'>
        <RandomNumber
          display={getText}
          init={this.state.init}
          style={{
            label: {
              color: 'gray'
            },
            value: {
              color: 'brown',
              fontFamily: 'monospace',
              fontSize: '1.75em'
            }
          }}
        />
      </div>
    </div></Paper>
  }
}
