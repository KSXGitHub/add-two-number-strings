import React from 'react'
import crypto from 'crypto'

export const DEFAULT_CONTAINER = ({children}) => (<span className='hash'>
  {children}
</span>)

export const DEFAULT_DISPLAY = array => Array.from(array)
  .map(byte =>
    [byte >> 4, byte & 0x0F]
      .map(bits => bits.toString(16))
      .join('')
  )
  .join('')

export const LISTENED_PROP_NAMES = [
  'display',
  'data',
  'encoding',
  'algorithm'
]

export default class HashGenerator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
  }

  render () {
    const {
      props: {
        container: Container = DEFAULT_CONTAINER,
        display = DEFAULT_DISPLAY
      },
      state: {
        value
      }
    } = this

    return <Container>
      <output>
        {value
          ? display(value)
          : <i>(Empty)</i>
        }
      </output>
    </Container>
  }

  componentDidMount () {
    this.updateState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const {props} = this

    for (const name of LISTENED_PROP_NAMES) {
      if (props[name] !== nextProps[name]) {
        this.updateState(nextProps)
        return
      }
    }
  }

  updateState (props) {
    const {
      data = '',
      encoding = 'utf8',
      algorithm = 'sha1'
    } = props

    if (!data) {
      this.setState({value: null})
      return Promise.resolve(null)
    }

    const hash = crypto.createHash(algorithm)

    return new Promise(resolve =>
      hash.end(data, encoding, () => {
        const value = hash.read()
        this.setState({value})
        resolve(value)
      })
    )
  }
}
