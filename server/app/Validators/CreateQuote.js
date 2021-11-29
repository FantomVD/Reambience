'use strict'

const yup = require('yup')

const Base = require('./Base')

class CreateQuote extends Base {
  static schema = () =>
    yup.object().shape({
      quote: yup.string().trim().min(1).required()
    })
}

module.exports = CreateQuote
