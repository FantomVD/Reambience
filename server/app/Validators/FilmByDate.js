'use strict'

const yup = require('yup')
const moment = require('moment')
const { parse, isDate } = require("date-fns");

const Base = require('./Base')

class FilmByDate extends Base {
  static schema = () =>
    yup.object().shape({
      date: yup.date().default(new Date()).transform(parseDateString).required()
    })
}

function parseDateString(value, originalValue) {
  return isDate(originalValue)
    ? originalValue
    : parse(originalValue, "dd.MM.yyyy", new Date());
}


module.exports = FilmByDate
