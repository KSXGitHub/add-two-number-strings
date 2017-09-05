import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import HashMassGenerator from './HashMassGenerator.jsx'

export default class HashMassGeneratorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editableData: '',
      actualData: ''
    }
  }

  render () {
    const {
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
          <label htmlFor='hash-data'>Data:</label>
        </div>

        <div>
          <TextField
            hintText='Data to be hash...'
            value={editableData}
            onChange={(_, editableData) => this.setState({editableData})}
          />
        </div>

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
        />
      </CardText>
    </Card></Paper>
  }
}
