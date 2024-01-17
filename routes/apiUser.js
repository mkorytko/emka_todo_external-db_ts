const express = require("express");

const router = express.Router();

const userController = require("../controllers/user/tasks");

const commonsMiddleware = require("../middlewares/apiCommons");

router.use(commonsMiddleware);

router.route("/getTasks")
    .get(userController.getTasks);

router.route("/addTask")
    .post(userController.addTasks);

module.exports = router;
