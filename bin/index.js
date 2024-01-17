require("dotenv").config();

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
} = process.env;

const mysql = require("mysql");

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected...");
});

require("../models/knex");

require("../app");
