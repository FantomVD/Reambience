'use strict'

const yup = require('yup')

const Base = require('./Base')

const { MAX_PLACES } = require('../constants')

class SessionCreate extends Base {
  static schema = () =>
    yup.object().shape({
      places: yup.array().of(yup.number().min(1).max(MAX_PLACES)).min(1).required(),
    })
}

module.exports = SessionCreate
