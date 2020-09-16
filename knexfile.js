require('dotenv/config');

module.exports = {
  client: 'mysql',
  connection: {
    host:       process.env.MYSQL_DB_HOST     || 'localhost',
    database:   process.env.MYSQL_DB_NAME     || 'db_auth',
    user:       process.env.MYSQL_DB_USER     || 'root',
    password:   process.env.MYSQL_DB_PASSWORD || '',
    timezone:   'America/Sao_Paulo',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations'
  }
};