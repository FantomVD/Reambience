'use strict'

const yup = require('yup')
const {
  LANGUAGES_SHORTS,
  LANGUAGES_FULL,
  LANGUAGE_FULL_AUTO,
  LANGUAGE_SHORT_AUTO,
} = require('../constants')

const Base = require('./Base')

class Translate extends Base {
  static schema = () =>
    yup.object().shape({
      text: yup.string().trim().required(),
      from: yup
        .string()
        .oneOf([LANGUAGE_SHORT_AUTO, ...LANGUAGES_SHORTS, LANGUAGE_FULL_AUTO, ...LANGUAGES_FULL]),
      to: yup.string().oneOf([...LANGUAGES_SHORTS, ...LANGUAGES_FULL]),
    })
}

module.exports = Translate
