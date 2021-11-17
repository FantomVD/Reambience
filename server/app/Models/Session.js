'use strict'

const Model = require('./BaseModel')

class Session extends Model {
  static get columns() {
    return ['id', 'film_id', 'date_time', 'price']
  }
  static get readonly() {
    return ['id', 'film_id', 'date_time']
  }

  static get traits() {
    return ['NoTimestamp']
  }

  film() {
    return this.has('App/Models/Film')
  }
}

module.exports = Session
