'use strict'

const yup = require('yup')
const moment = require('moment')
const { parse, isDate } = require('date-fns')

const Base = require('./Base')

class UpdateUser extends Base {
  static schema = () =>
    yup.object().shape({
      username: yup.string().min(4).max(20),
      avatar: yup.mixed(),
      password: yup.string().min(8),
    })
}

module.exports = UpdateUser
