'use strict'

global.Date = class MockedDate extends Date {
  constructor (data = 0, ...args) {
    super(data, ...args)
  }

  toString () {
    return this.toLocaleTimeString()
  }

  toLocaleString () {
    return this.toString()
  }

  toTimeString () {
    return this.toLocaleTimeString()
  }

  toDateString () {
    return this.toLocaleDateString()
  }

  toLocaleTimeString () {
    return super.toLocaleTimeString('en-US', {timeZone: 'UTC'})
  }

  toLocaleDateString () {
    return super.toLocaleDateString('en-US', {timeZone: 'UTC'})
  }
}

global.Math = Object.assign(
  Object.create(Math),
  Math,
  {random: () => 0.8253283060883272}
)
