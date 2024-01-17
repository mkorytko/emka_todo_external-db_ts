const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin/tasks");

const commonsMiddleware = require("../middlewares/apiCommons");

router.use(commonsMiddleware);

router.route("/updateTask")
    .put(adminController.updateTask);

module.exports = router;
