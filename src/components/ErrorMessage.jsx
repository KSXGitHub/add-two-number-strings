import React from 'react'
import {red500} from 'material-ui/styles/colors'

export const DEFAULT_ERROR = new Error('Empty')

export const DEFAULT_STYLE = {
  color: red500,
  fontFamily: 'monospace',
  fontSize: '0.75em'
}

export const DEFAULT_WRAP = children =>
  (<span className='error' style={DEFAULT_STYLE}>{children}</span>)

export default function ErrorMessage (props) {
  const {
    error = DEFAULT_ERROR,
    wrap = DEFAULT_WRAP
  } = props

  return wrap(String(error))
}
