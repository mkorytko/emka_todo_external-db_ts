require("dotenv").config();

module.exports = {
    development: {
        client: "mysql",
        connection: process.env.DB_URL,
    },
};
