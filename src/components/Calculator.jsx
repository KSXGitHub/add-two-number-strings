import React from 'react'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ErrorMessage from './ErrorMessage.jsx'
import jtry from 'just-try'
import add from '../lib/add-two-number-strings'

const LABEL = 'Really big natural number'

export default class Calculator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      left: '',
      right: ''
    }
  }

  render () {
    const {left, right} = this.state

    const handleChange = name => event => this.setState({[name]: event.target.value})

    return <div>
      <TextField id='left' label={LABEL} value={left} onChange={handleChange('left')} />
      <TextField id='right' label={LABEL} value={right} onChange={handleChange('right')} />

      <Typography>
        {jtry(
          () => add(String(left), String(right)),

          error => <ErrorMessage error={error} />,

          value => <span style={{fontSize: '1.75em'}}>
            Total:
            <code>{value}</code>
          </span>
        )}
      </Typography>
    </div>
  }
}
