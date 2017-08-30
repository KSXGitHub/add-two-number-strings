'use strict'
const ABS_URL = /^[a-z]{2,}:/i
const ABS_POSIX = /^\//
const ABS_MSWIN = /^[a-z]:/i
const mktestfn = regex => uri => regex.test(String(uri))
const isAbsURL = mktestfn(ABS_URL)
const isAbsPOSIX = mktestfn(ABS_POSIX)
const isAbsMSWindows = mktestfn(ABS_MSWIN)
const absfn = [isAbsURL, isAbsPOSIX, isAbsMSWindows]
const isAbsolute = uri => absfn.some(fn => fn(uri))
const isRelative = uri => !isAbsolute(uri)
const mksuffix = uri => encodeURI(String(uri).split('\\').join('/'))

function resolve (uri) {
  if (isAbsURL(uri)) return mksuffix(uri)
  if (isAbsPOSIX(uri)) return 'file://' + mksuffix(uri)
  if (isAbsMSWindows(uri)) return 'file:///' + mksuffix(uri)
  return uri
}

module.exports = {
  regexes: {
    ABS_URL,
    ABS_POSIX,
    ABS_MSWIN
  },
  testers: {
    isAbsURL,
    isAbsPOSIX,
    isAbsMSWindows,
    isAbsolute,
    isRelative
  },
  resolve
}
