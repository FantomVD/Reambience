'use strict'

const yup = require('yup')
const moment = require('moment')
const { parse, isDate } = require('date-fns')

const Base = require('./Base')

class CreateSession extends Base {
  static schema = () =>
    yup.object().shape({
      film_id: yup.number().integer().positive().required(),
      price: yup.number().positive().min(50).default(90),
      date_time: yup.date().transform(parseDateString).required(),
    })
}

function parseDateString(value, originalValue) {
  const newValue = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'dd.MM.yyyy HH:mm', new Date())
  return new Date(moment(newValue))
}

module.exports = CreateSession
