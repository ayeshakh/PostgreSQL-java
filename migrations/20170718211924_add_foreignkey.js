
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
    table.integer('famous_person_id').unsigned()
    table.foreign('famous_person_id').references('famous_people.id')
    })
  ])
};

exports.down = function(knex, Promise) {
 return Promise.all([
    knex.schema.table('milestones', function(table) {
      // table.dropForeign(['famous_person_id'], ['famous_person_id']);
      table.dropColumn('famous_person_id');
    })
  ]);
};

// return knex.schema.table('products', function(t) {
//         t.dropIndex([ 'price' ]);
//     });