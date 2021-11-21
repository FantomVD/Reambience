const translate = require('translate-google')
const { pickBy, omitBy, isNil, isEmpty } = require('lodash')
const { DEFAULT_TARGET_LANGUAGE } = require('../constants')

class TranslateService {
  static async translateText({ text, ...options }) {
    options = omitBy(options, isNil)
    if (!isEmpty(options)) {
      return translate(text, options)
    }
    return translate(text)
  }

  static async detectLanguage() {}
}

module.exports = TranslateService
