'use strict'

const BaseSerializer = require('./BaseSerializer')
const { trimEnd, trimStart } = require('lodash')

const Env = use('Env')
const staticUrl = Env.get('STATIC_URL')

/**
 * Merge data
 */
class FilmSerializer extends BaseSerializer {
  mergeData(item) {
    item.small_image = item.small_image
      ? `${trimEnd(staticUrl, '/')}/${trimStart(item.small_image, '/')}`
      : null
    item.large_image = item.large_image
      ? `${trimEnd(staticUrl, '/')}/${trimStart(item.large_image, '/')}`
      : null

    return this._getRowJSON(item)
  }
}

module.exports = FilmSerializer
