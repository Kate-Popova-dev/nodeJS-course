import {changeStatus, getTodoList as getToDoService, postTodo} from "../services/todo.service.js"

export function getTodoList(req, res) {
    return res.json({
        list: getToDoService()
    })
}

export async function createToDo(req, res) {
    const toDo = req.body
    await postTodo(toDo)

    return res.json({"status": "OK"})
}

export function changeToDo(req, res) {
    changeStatus(req.params.itemId, req.body.status);
    return res.json({"status": "OK"})
}