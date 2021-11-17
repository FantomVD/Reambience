'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SessionSchema extends Schema {
  up () {
    this.create('sessions', (table) => {
      table.increments()
      table.integer('film').references('id').inTable('films')
      table.dateTime('date_time').notNullable()
      table.decimal('price').notNullable()
      table.unique(['film', 'date_time'])
    })
  }

  down () {
    this.drop('sessions')
  }
}

module.exports = SessionSchema
