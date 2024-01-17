const Task = require("../../models/Task");

exports.getTasks = async function getTasks(req, res, next) {
    try {
        const { limit, page } = req.preparePagination();
        const { order, orderCol } = req.orderBy();
        const tasks = await Task.query()
            .orderBy(orderCol, order)
            .page(page - 1, limit)
            .select("id", "name", "email", "task", "edited", "done");
        res.sendData(tasks.results, tasks.total);
    } catch (e) {
        next(e);
    }
};

exports.addTasks = async function addTasks(req, res, next) {
    try {
        await Task.query()
            .insert({ ...req.body, edited: 0, done: 0 });
        return exports.getTasks(req, res, next);
    } catch (e) {
        next(e);
    }
};
