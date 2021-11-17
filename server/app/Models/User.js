'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const Model = require('./BaseModel')

class User extends Model {
  static get columns() {
    return ['id', 'username', 'password', 'email', 'avatar']
  }

  static get readonly() {
    return ['id', 'email']
  }

  static get hidden() {
    return ['password']
  }

  /**
   *
   */
  static get Serializer() {
    return 'App/Serializers/UserSerializer'
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  static get traits() {
    return ['NoTimestamp']
  }
}

module.exports = User
