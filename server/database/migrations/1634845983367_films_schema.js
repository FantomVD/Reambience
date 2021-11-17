'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilmsSchema extends Schema {
  up () {
    this.table('sessions', (table) => {
      table.renameColumn('film','film_id')
    })
  }

  down () {
    this.table('sessions', (table) => {
      table.renameColumn('film_id','film')
    })
  }
}

module.exports = FilmsSchema
