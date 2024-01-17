const Task = require("../../models/Task");

exports.updateTask = async function updateTask(req, res, next) {
    try {
        const {
            id, ...params
        } = req.body;
        if (!id || !params?.task) {
            return res.sendError("Неверный запрос", 400);
        }
        const model = await Task.query().findById(id);
        let { edited } = model;
        if (edited === 0 && model?.task !== params.task) {
            edited = 1;
        }
        const updatedModel = await Task.query()
            .patchAndFetchById(id, {
                ...params,
                edited,
            })
            .select("id", "name", "email", "task", "edited", "done");
        if (updatedModel) {
            return res.sendData(updatedModel);
        }
    } catch (e) {
        next(e);
    }
};
