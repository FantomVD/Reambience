'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('title')
      table.string('author')
      table.string('forImage')
      table.string('path')
    })

    this.create('favourite_books', (table) => {
      table.integer('user_id').references('id').inTable('users').onDelete('cascade')
      table.integer('book_id').references('id').inTable('books').onDelete('cascade')
    })

    this.create('quotes', (table)=>{
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('cascade')
      table.integer('book_id').references('id').inTable('books').onDelete('cascade')
      table.string('quote', 1024)
    })
  }

  down () {
    this.drop('quotes')
    this.drop('favourite_books')
    this.drop('books')
  }
}

module.exports = BooksSchema
