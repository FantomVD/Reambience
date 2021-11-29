'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuoteSchema extends Schema {
  up () {
    this.table('quotes', (table) => {
      table.dropColumn('book_id')
    })
  }

  down () {
    this.table('quotes', (table) => {
      table.integer('book_id').references('id').inTable('books').onDelete('cascade')
    })
  }
}

module.exports = QuoteSchema
