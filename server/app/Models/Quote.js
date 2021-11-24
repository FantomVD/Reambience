'use strict'

const Model = require('./BaseModel')

class Quote extends Model {
  static get columns(){
    return [
      'book_id',
      'user_id',
      'quote'
    ]
  }
  static get readonly(){
    return [
      'book_id',
      'user_id',
      'quote',
    ]
  }

  static get traits(){
    return ['NoTimestamp']
  }
}

module.exports = Quote
