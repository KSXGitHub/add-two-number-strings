import React from 'react'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Slider from 'material-ui/Slider'
import MonacoEditor from 'react-monaco-editor'
import Clock from './Clock.jsx'
import NamedRadixes from './NamedRadixes.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import vm from 'vm'
import moment from 'moment'
import jtry from 'just-try'
import ProductIterable from 'product-iterable'

export default class ClockForm extends React.Component {
  constructor (props) {
    super(props)

    const {
      refreshDuration = 1000,
      formattingMethod = 'native-to-string',
      formattingExpression = `moment(date).format('LLLL')`,
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
      2),
      timestampRadix = 10,
      timestampRadixNames,
      timestampUpperCase = true
    } = props

    this.state = {
      refreshDuration,
      formattingMethod,
      formattingExpression,
      momentTemplateString,
      toStringMethodName,
      toStringMethodArguments,
      timestampRadix,
      timestampRadixNames,
      timestampUpperCase
    }
  }

  render () {
    const {
      darkTheme = false
    } = this.props

    const monacoEditorTheme = darkTheme ? 'vs-dark' : 'vs-light'

    return <Paper zDepth={1}><Card>
      <CardHeader
        title='Clock'
        subtitle='Click to customize clock'
        actAsExpander
        showExpandableButton
      />

      <CardActions expandable>
        <div id='refresh-duration-container'>
          <p className='label-container label-paragraph'>
            <label htmlFor='refresh-duration'>Refresh Duration:&nbsp;</label>
            <output htmlFor='refresh-duration'>{this.state.refreshDuration}</output>
          </p>

          <Slider
            id='refresh-duration'
            min={512}
            max={1024}
            value={this.state.refreshDuration}
            onChange={(_, refreshDuration) => this.setState({refreshDuration})}
            step={1}
          />
        </div>

        <Tabs
          value={this.state.formattingMethod}
          onChange={value => this.setState({formattingMethod: value})}
        >
          <Tab label='JavaScript Expression' value='javascript-expression'>
            <MonacoEditor
              height='200'
              language='javascript'
              theme={monacoEditorTheme}
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
              theme={monacoEditorTheme}
              value={this.state.toStringMethodArguments}
              onChange={value => this.setState({toStringMethodArguments: value})}
            />
          </Tab>

          <Tab label='UNIX Timestamp' value='timestamp'>
            <p>Radix</p>
            <NamedRadixes
              radix={this.state.timestampRadix}
              names={this.state.timestampRadixNames}
              onChange={value => this.setState({timestampRadix: value})}
            />

            <Checkbox
              label='Upper Case'
              checked={this.state.timestampUpperCase}
              disabled={this.state.timestampRadix <= 10}
              onCheck={(_, checked) => this.setState({timestampUpperCase: checked})}
            />
          </Tab>
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
    const yieldError = error => (<ErrorMessage error={error} />)

    switch (method) {
      case 'javascript-expression': {
        try {
          const script = new vm.Script(this.state.formattingExpression)
          return date => jtry(
            () => script.runInNewContext({moment, date}),
            yieldError,
            value => value ? String(value) : <i>(Empty)</i>
          )
        } catch (error) {
          return yieldError(error)
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
            return yieldError(error)
          }
        }
      }

      case 'timestamp': {
        return date => (Number(date)
          .toString(this.state.timestampRadix)
        )[this.state.timestampUpperCase ? 'toUpperCase' : 'toLowerCase']()
      }

      default: {
        throw new Error(`Not implemented for ${JSON.stringify(method)}`)
      }
    }
  }
}
