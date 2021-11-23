'use strict'

const yup = require('yup')
const moment = require('moment')
const { parse, isDate } = require('date-fns')

const Base = require('./Base')

class CreateBook extends Base {
  static schema = () =>
    yup.object().shape({
      book: yup.mixed(),
      title: yup.string().trim().min(2),
      author: yup.string().trim().min(2),
    })
}

module.exports = CreateBook
