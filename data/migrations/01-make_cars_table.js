exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.increments('car_id')
    table.string('make', 128).notNullable()
    table.string('vin', 17).unique().notNullable()
    table.string('model', 128).notNullable()
    table.integer('mileage').notNullable()
    table.string('title')
    table.string('transmission')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
