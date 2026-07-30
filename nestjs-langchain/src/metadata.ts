/* eslint-disable */
export default async () => {
    const t = {
        ["./todo/dto/create-todo.dto"]: await import("./todo/dto/create-todo.dto"),
        ["./todo/dto/update-todo.dto"]: await import("./todo/dto/update-todo.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./todo/dto/create-todo.dto"), { "CreateTodoDto": { title: { required: true, type: () => String, minLength: 2, maxLength: 100 }, content: { required: true, type: () => String, maxLength: 500 }, isCompleted: { required: true, type: () => Boolean } } }], [import("./todo/dto/update-todo.dto"), { "UpdateTodoDto": {} }], [import("./todo/dto/prompt.dto"), { "PromptDto": { content: { required: true, type: () => String, maxLength: 500 } } }], [import("./todo/entities/todo.entity"), { "TodoEntity": { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, content: { required: true, type: () => String }, isCompleted: { required: true, type: () => Boolean } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./todo/todo.controller"), { "TodoController": { "findAll": {}, "getAI": { type: Object }, "findOne": {}, "create": { type: t["./todo/dto/create-todo.dto"].CreateTodoDto }, "update": { type: t["./todo/dto/update-todo.dto"].UpdateTodoDto }, "delete": {} } }]] } };
};