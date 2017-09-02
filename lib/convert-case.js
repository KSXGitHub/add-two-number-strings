'use strict'

const REGEX = {
  WORD_DELIM: /[_\- \t\n\r]+/,
  NEWLINE: /\r?\n\r?/
}

const convertCase = {
  toCamelCase: (string = '') => {
    const [first, ...rest] = String(string).split(REGEX.WORD_DELIM)

    return [
      first.toLowerCase(),
      ...rest.map(convertCase.capitalize)
    ].join('')
  },

  toPascalCase: (string = '') =>
    String(string).split(REGEX.WORD_DELIM).map(convertCase.capitalize).join(''),

  toKebabCase: (string = '') =>
    convertCase.seperaterize(string, convertCase.lowerize, '-'),

  toUpperKebabCase: (string = '') =>
    convertCase.seperaterize(string, convertCase.upperize, '-'),

  toSnakeCase: (string = '') =>
    convertCase.seperaterize(string, convertCase.lowerize, '_'),

  toUpperSnakeCase: (string = '') =>
    convertCase.seperaterize(string, convertCase.upperize, '_'),

  seperaterize: (string = '', convertCase, delim) =>
    String(string).split(REGEX.WORD_DELIM).map(convertCase).join(delim),

  lowerize: (string = '') => String(string).toLowerCase(),

  upperize: (string = '') => String(string).toUpperCase(),

  capitalize: ([first, ...rest] = '') => [
    String(first).toUpperCase(),
    ...rest.map(x => String(x).toLowerCase())
  ].join('')
}

const proto = {
  REGEX,
  convertCase
}

module.exports = Object.assign(Object.create(proto), REGEX, convertCase)
