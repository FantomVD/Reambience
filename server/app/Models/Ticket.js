'use strict'

const Model = require('./BaseModel')

class Ticket extends Model {
  static get columns(){
    return [
      'id',
      'user_id',
      'session_id',
      'place'
    ]
  }
  static get readonly(){
    return [
      'id',
      'user_id',
      'session_id',
      'place'
    ]
  }

  static get traits(){
    return ['NoTimestamp']
  }
}

module.exports = Ticket
