import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import HashMassGenerator from './HashMassGenerator.jsx'

export const DISPLAY_FUNCTIONS = {
  hex: array => array.toString('hex'),
  utf8: array => array.toString('utf8'),
  dec: array => `[${Array.from(array).map(x => Number(x)).join(', ')}]`
}

export const HASH_GENERATOR_STYLE = {
  fontFamily: 'monospace',
  color: 'green'
}

export default class HashMassGeneratorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayFormat: 'hex',
      displayFunction: DISPLAY_FUNCTIONS.hex,
      editableData: '',
      actualData: ''
    }
  }

  render () {
    const {
      displayFormat,
      displayFunction,
      editableData,
      actualData
    } = this.state

    return <Paper zDepth={1}><Card>
      <CardHeader
        title='Hash Generator'
        subtitle='Expand this card to generate cryptographic hashes'
        actAsExpander
        showExpandableButton
      />

      <CardActions expandable>
        <div>
          <TextField
            hintText='Data to be hash...'
            value={editableData}
            onChange={(_, editableData) => this.setState({editableData})}
            fullWidth
            multiLine
          />
        </div>

        <div><RadioButtonGroup
          name='hash-display-format'
          valueSelected={displayFormat}
          onChange={(_, value) => this.updateDisplayFunction(value)}
        >
          <RadioButton value='hex' label='Hexadecimal String' />
          <RadioButton value='utf8' label='Unicode (UTF-8) String' />
          <RadioButton value='dec' label='Decimal Array' />
        </RadioButtonGroup></div>

        <div>
          <RaisedButton
            label='Generate'
            onClick={() => this.setState({actualData: editableData})}
            disabled={actualData === editableData}
            primary
          />

          <FlatButton
            label='Clear'
            onClick={() => this.setState({actualData: '', editableData: ''})}
            disabled={!editableData}
            secondary
          />
        </div>
      </CardActions>

      <CardText expandable>
        <HashMassGenerator
          data={actualData}
          hashGeneratorProps={{
            display: value =>
              (<span style={HASH_GENERATOR_STYLE}>{displayFunction(value)}</span>)
          }}
        />
      </CardText>
    </Card></Paper>
  }

  updateDisplayFunction (displayFormat) {
    this.setState({
      displayFormat,
      displayFunction: DISPLAY_FUNCTIONS[displayFormat]
    })
  }
}
