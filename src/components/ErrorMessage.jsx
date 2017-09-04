import React from 'react'

export const DEFAULT_ERROR = new Error('Empty')

export const DEFAULT_STYLE = {
  color: 'red',
  fontSize: '0.75em'
}

export const DEFAULT_WRAP = children =>
  (<span className='error' style={DEFAULT_STYLE}>{children}</span>)

export default function ErrorMessage (props) {
  const {
    error: {message} = DEFAULT_ERROR,
    wrap = DEFAULT_WRAP
  } = props

  return wrap(message)
}
