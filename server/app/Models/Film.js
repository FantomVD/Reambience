'use strict'

const Model = require('./BaseModel')
const Session = require('@adonisjs/session/src/Session')

class Film extends Model {
  static get columns() {
    return [
      'id',
      'name',
      'description',
      'publish_year',
      'rating',
      'age_restriction',
      'duration',
      'producer',
      'large_image',
      'small_image',
    ]
  }

  static get readonly() {
    return [
      'id',
      'name',
      'description',
      'publish_year',
      'rating',
      'age_restriction',
      'duration',
      'producer',
    ]
  }

  static get traits() {
    return ['NoTimestamp']
  }

  /**
   *
   */
  static get Serializer() {
    return 'App/Serializers/FilmSerializer'
  }

  sessions() {
    return this.hasMany('App/Models/Session')
  }
}

module.exports = Film
