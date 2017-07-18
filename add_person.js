const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

let firstname = process.argv[2];
let lastname = process.argv[3];
let date = process.argv[4];

knex("famous_people")
  .insert({ first_name: firstname, last_name: lastname, birthdate: date})
  .asCallback(function (err) {
      if (err) return console.error(err);
      return knex.destroy();
  });
  // kills the connection as the connection stays open

