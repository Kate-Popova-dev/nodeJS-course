import {changeStatus, getTodoList as getToDoService, postToDo} from "../services/todo.service.js"

export function getTodoList(req, res) {
    return res.json({
        list: getToDoService()
    })
}

export function createToDo(req, res) {
    const toDo = req.body
    postToDo(toDo)

    return res.json({"status": "OK"})
}

export function changeToDo(req, res) {
    changeStatus(req.params.itemId, req.body.status);
    return res.json({"status": "OK"})
}