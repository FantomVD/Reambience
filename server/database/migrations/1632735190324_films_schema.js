'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilmsSchema extends Schema {
  up () {
    this.create('films', (table) => {
      table.increments()
      table.string('name', 60).notNullable()
      table.text('description').notNullable()
      table.integer('publish_year').notNullable()
      table.decimal('rating')
      table.integer('age_restriction')
      table.time('duration')
      table.string('producer')
      table.string('large_image')
      table.string('small_image')
    })
  }

  down () {
    this.drop('films')
  }
}

module.exports = FilmsSchema
