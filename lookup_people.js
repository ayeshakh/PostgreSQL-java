const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  let input = process.argv[2];
  const query = `SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].id);
    for (let row of result.rows) {
      console.log("Searching .......");
      console.log(
        "Found 1 person(s) by the name " + input + ": - ",
        row.id, ":",
        row.first_name, " ",
        row.last_name,
        " born, ",
        row.birthdate
      );
    }

  client.end();
  });
});
