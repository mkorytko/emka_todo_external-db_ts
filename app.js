require("dotenv").config();
const express = require("express");

const debug = require("debug")("todo:app");

const app = express();

const { BACKEND_PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const initRoutes = require("./routes");

app.use("/", initRoutes);

const createError = require("http-errors");

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res) => {
    debug(err);
    res.status(err.status || 500);
    res.send("error");
});

app.listen(BACKEND_PORT, () => console.log(`Start server on ${BACKEND_PORT}`));
