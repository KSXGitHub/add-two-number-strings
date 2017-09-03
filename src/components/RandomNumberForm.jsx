import React from 'react'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import Checkbox from 'material-ui/Checkbox'
import RandomNumber from './RandomNumber.jsx'
import NamedRadixes from './NamedRadixes.jsx'

export default class RandomNumberForm extends React.Component {
  constructor (props) {
    super(props)

    const {
      begin = 0,
      end = 13,
      uppercase = true,
      radix = 16,
      defaultContent = <i>(Empty)</i>,
      init
    } = props

    this.state = {
      begin,
      end,
      uppercase,
      radix,
      defaultContent,
      init
    }
  }

  render () {
    const getText = float => (
      (parseFloat(float)
        .toString(this.state.radix)
        .slice(2)
        .slice(this.state.begin, this.state.end)
      )[this.state.uppercase ? 'toUpperCase' : 'toLowerCase']()
    ) || this.state.defaultContent

    return <Paper zDepth={1}><Card>
      <CardHeader
        title='Random Number'
        subtitle='Click to expand tweak tools'
        actAsExpander
        showExpandableButton
      />

      <CardText expandable>
        <CardActions expandable>
          <p>
            <label htmlFor='begin-slider'>Begin</label>
          </p>

          <Slider
            id='begin-slider'
            min={0}
            max={this.state.end}
            step={1}
            value={this.state.begin}
            onChange={(_, begin) => begin < this.state.end && this.setState({begin})}
          />

          <p>
            <label htmlFor='end-slider'>End</label>
          </p>

          <Slider
            id='end-slider'
            min={this.state.begin}
            max={13}
            step={1}
            value={this.state.end}
            onChange={(_, end) => end > this.state.begin && this.setState({end})}
          />

          <Checkbox
            label='Upper Case'
            checked={this.state.uppercase}
            onCheck={(_, uppercase) => this.setState({uppercase})}
            style={{marginBottom: 16}}
            labelPosition='right'
          />

          <div className='radix-container'>
            <p>Radix</p>
            <NamedRadixes
              radix={this.state.radix}
              onChange={radix => this.setState({radix})}

              textFieldProps={{
                hintText: 'Radix number'
              }}

              selectFieldProps={{
                floatingLabelText: 'Radix name'
              }}
            />
          </div>
        </CardActions>
      </CardText>

      <CardText>
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
          label={null}
        />
      </CardText>
    </Card></Paper>
  }
}
