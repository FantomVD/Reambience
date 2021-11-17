'use strict'

const BaseSerializer = require('./BaseSerializer')
const { trimEnd, trimStart } = require('lodash')

const Env = use('Env')
const staticUrl = Env.get('STATIC_URL')

/**
 * Merge data
 */
class UserSerializer extends BaseSerializer {
  mergeData(item) {
    item.avatar = item.avatar ? `${trimEnd(staticUrl, '/')}/${trimStart(item.avatar, '/')}` : null
    return this._getRowJSON(item)
  }
}

module.exports = UserSerializer
