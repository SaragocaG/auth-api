exports.up = function (knex) {
  return knex.schema.createTable('tb_user_scope', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('id_user').notNullable();
    table.string('scope', 255).notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tb_user_scope');
};
