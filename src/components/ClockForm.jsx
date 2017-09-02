import React from 'react'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import MonacoEditor from 'react-monaco-editor'
import vm from 'vm'
import moment from 'moment'
import jtry from 'just-try'
import ProductIterable from 'product-iterable'
import Clock from './Clock.jsx'

export default class ClockForm extends React.Component {
  constructor (props) {
    super(props)

    const {
      formattingMethod = 'javascript-expression',
      formattingExpression = `date => {\n  return moment(date).format('LLLL')\n}`,
      momentTemplateString = 'dddd — YYYY MMMM D — h:mm:ss a',
      toStringMethodName = 'toLocaleTimeString',
      toStringMethodArguments = JSON.stringify(
        {
          locale: window.navigator.language,
          options: {
            hour12: false
          }
        },
        undefined,
      2)
    } = props

    this.state = {
      formattingMethod,
      formattingExpression,
      momentTemplateString,
      toStringMethodName,
      toStringMethodArguments
    }
  }

  render () {
    return <Paper zDepth={1}><Card>
      <CardHeader
        title='Clock'
        subtitle='Click to customize clock'
        actAsExpander
        showExpandableButton
      />

      <CardActions expandable>
        <Tabs
          value={this.state.formattingMethod}
          onChange={value => this.setState({formattingMethod: value})}
        >
          <Tab label='JavaScript Expression' value='javascript-expression'>
            <MonacoEditor
              height='200'
              language='javascript'
              theme='vs-light'
              value={this.state.formattingExpression}
              onChange={value => this.setState({formattingExpression: value})}
            />
          </Tab>
          <Tab label='Moment.js' value='momentjs'>
            <TextField
              hintText='Moment.js Date/Time Format'
              value={this.state.momentTemplateString}
              onChange={(_, value) => this.setState({momentTemplateString: value})}
            />
          </Tab>
          <Tab label='Native toString function' value='native-to-string'>
            <div>{React.createElement(
              SelectField,
              {
                floatingLabelText: 'Function',
                value: this.state.toStringMethodName,
                onChange: (_, __, value) => this.setState({toStringMethodName: value})
              },
              ...new ProductIterable(['', 'Locale'], ['', 'Date', 'Time'])
                .map(([locale, datetime]) => `to${locale}${datetime}String`)
                .map(fname => (<MenuItem value={fname} primaryText={`.${fname}()`} />))
            )}</div>
            <MonacoEditor
              height='150'
              language='json'
              theme='vs-light'
              value={this.state.toStringMethodArguments}
              onChange={value => this.setState({toStringMethodArguments: value})}
            />
          </Tab>
          <Tab label='UNIX Timestamp' value='timestamp' />
        </Tabs>
      </CardActions>

      <CardText>
        <Clock
          display={date => (<div style={{fontSize: '1.5em'}}>{
            this.getFormattingMethod(this.state.formattingMethod)(date)
          }</div>)}
          {...this.state}
        />
      </CardText>
    </Card></Paper>
  }

  getFormattingMethod (method = this.state.formattingMethod) {
    const mkerror = error => (
      <code
        className='error'
        data-error={error}
        style={{
          fontFamily: 'monospace',
          color: 'red'
        }}
      >
        {error.message}
      </code>
    )

    switch (method) {
      case 'javascript-expression': {
        try {
          const script = new vm.Script(this.state.formattingExpression)
          const result = script.runInNewContext({moment})
          return typeof result === 'function'
            ? date => String(jtry(() => result()))
            : () => 'TypeError: Script must return a function'
        } catch (error) {
          return () => mkerror(error.message)
        }
      }

      case 'momentjs': {
        return date =>
          moment(date).format(this.state.momentTemplateString)
      }

      case 'native-to-string': {
        return date => {
          try {
            const {locale, options} = JSON.parse(this.state.toStringMethodArguments)
            return date[this.state.toStringMethodName](locale, options)
          } catch (error) {
            return mkerror(error.message)
          }
        }
      }

      case 'timestamp': {
        return date => Number(date)
      }

      default: {
        throw new Error(`Not implemented for ${JSON.stringify(method)}`)
      }
    }
  }
}
