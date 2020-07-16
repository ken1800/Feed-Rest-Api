const db = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "proff",
        password: "proff1800",
        database: "feeds",
    },
});


exports.db = db;