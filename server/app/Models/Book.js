'use strict'

const Model = require('./BaseModel')

class Book extends Model {
  static get columns(){
    return [
      'id',
    'title',
    'author',
    'forImage',
    'path',
    ]
  }
  static get readonly(){
    return [
      'id',
    ]
  }

  static get traits(){
    return ['NoTimestamp']
  }
}

module.exports = Book
