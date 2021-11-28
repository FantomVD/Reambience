'use strict'

const BaseSerializer = require('./BaseSerializer')
const { trimEnd, trimStart } = require('lodash')

const Env = use('Env')
const staticUrl = Env.get('STATIC_URL')

const url = 'https://reambience.s3.eu-west-2.amazonaws.com/books/'
/**
 * Merge data
 */
class BookSerializer extends BaseSerializer {
  mergeData(item) {
    item.download_url = url+item.path
    return this._getRowJSON(item)
  }
}

module.exports = BookSerializer
