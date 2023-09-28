
exports.up = function (knex, Promisse) {
    return () => {
        knex.schema.createTable('post', function (table) {
            table.increments();
            table.string('name').notNullable();
            table.string('content').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
    }
};

exports.down = function (knex, Promisse) {
    return knex.schema.dropTable('post');
};
