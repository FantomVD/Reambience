'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = require('url-parse')
const DATABASE_URL = new URL(Env.get('DATABASE_URL') || 'postgres://bbgrdcclswdsse:630987605036af0f94087b41e5aafc29253fd290ea327052021d175397af40a3@ec2-3-248-87-6.eu-west-1.compute.amazonaws.com:5432/da7fg2u0u9eq52')
console.log(DATABASE_URL)
module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection:'pg',

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  // mysql: {
  //   client: 'mysql',
  //   connection: {
  //     host: Env.get('DB_HOST', CLEARDB_DATABASE_URL.host),
  //     port: Env.get('DB_PORT', ''),
  //     user: Env.get('DB_USER', CLEARDB_DATABASE_URL.username),
  //     password: Env.get('DB_PASSWORD', CLEARDB_DATABASE_URL.password),
  //     database: Env.get('DB_DATABASE', CLEARDB_DATABASE_URL.pathname.substr(1))
  //   }
  // },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', DATABASE_URL.hostname),
      port: Env.get('DB_PORT', DATABASE_URL.port),
      user: Env.get('DB_USER', DATABASE_URL.username),
      password: Env.get('DB_PASSWORD', DATABASE_URL.password),
      database: Env.get('DB_DATABASE', DATABASE_URL.pathname.substr(1))
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  }
}
