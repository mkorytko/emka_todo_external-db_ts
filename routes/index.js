const express = require("express");

const router = express.Router();

const userApiRouter = require("./apiUser");

router.use("/api/user", userApiRouter);

const adminApiRouter = require("./apiAdmin");

router.use("/api/admin", adminApiRouter);

module.exports = router;
