const db = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "ken",
        password: "secret",
        database: "feeds",
    },
});


exports.db = db;