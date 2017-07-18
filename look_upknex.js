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

let input = process.argv[2];
knex.select('*').from('famous_people')
.where('last_name', '=', input)
.orWhere('first_name', '=', input)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      console.log(rows);
      return knex.destroy(); // kills the connection as the connection stays open
});


