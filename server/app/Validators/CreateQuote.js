'use strict'

const yup = require('yup')

const Base = require('./Base')

class CreateQuote extends Base {
  static schema = () =>
    yup.object().shape({
      book_id: yup.number().integer().min(0).required(),
      quote: yup.string().trim().min(1).required()
    })
}

module.exports = CreateQuote
