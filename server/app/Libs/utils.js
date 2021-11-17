const url = require('url')
const { isString, get, isEmpty } = require('lodash')
const { ROLE_USER, ROLE_LANDLORD, ROLE_ADMIN } = require('../constants')

const getUrl = (pathname, query = {}) => {
  const base = url.parse(use('Env').get('APP_URL'))
  return url.format({ ...base, pathname, query })
}

const valueToJSON = (value) => {
  if (!isString(value)) {
    return value
  }

  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

const wrapValidationError = (e) => {
  const { ValidationException } = use('Validator')
  const errors = isEmpty(e.inner) ? [e] : get(e, 'inner', [])

  const messages = errors.reduce((n, i) => {
    return [
      ...n,
      {
        field: i.path,
        validation: i.message,
      },
    ]
  }, [])

  return ValidationException.validationFailed(messages)
}

const getHash = (h) => {
  const string = Math.random().toString(36).substring(h)
  return string.toUpperCase()
}

module.exports = {
  getUrl,
  valueToJSON,
  wrapValidationError,
  getHash,
}
