'use strict'

global.Date = class MockedDate extends Date {
  constructor (data = 0, ...args) {
    super(data, ...args)
  }
}

global.Math = Object.assign(
  Object.create(Math),
  Math,
  {random: () => 0.8253283060883272}
)
