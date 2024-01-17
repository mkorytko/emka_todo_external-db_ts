const BaseModel = require("./index");
const knex = require("./knex");

require("dotenv").config();

BaseModel.knex(knex);

class Task extends BaseModel {
    static tableName = "tasks";

    static jsonSchema = {
        type: "object",
        required: ["name", "email", "task", "edited", "done"],

        properties: {
            id: { type: "integer" },
            name: { type: "string", default: "" },
            email: { type: "string", default: "" },
            task: { type: "string", default: "" },
            edited: { type: "integer" },
            done: { type: "integer" },
        },
    };
}

module.exports = Task;
