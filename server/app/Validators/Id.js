'use strict'

const yup = require('yup')

const Base = require('./Base')

class Id extends Base {
  static schema = () =>
    yup.object().shape({
      id: yup.number().positive().integer().required(),
    })
}

module.exports = Id
