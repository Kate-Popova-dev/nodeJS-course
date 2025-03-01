import {todoList} from "../../data/todoList.js";


export function getTodoList() {
    return todoList
}

export function idExists(id) {
    return !!todoList.find(toDo => toDo.id === parseInt(id))
}

export function getToDo(id) {
    return todoList.find(user => user.id === parseInt(id))
}

export function postToDo(toDo) {
    todoList.push(toDo)
}

export function changeStatus(id, status) {
    todoList.find((i) => i.id.toString() === id.toString()).status = status;
}