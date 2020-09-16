
exports.up = function(knex) {
  return knex.schema.createTable('tb_user', (table) => {
    table.increments('id').primary().unsigned();
    table.string('email', 255).notNullable().unique();
    table.string('name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_user');
};
