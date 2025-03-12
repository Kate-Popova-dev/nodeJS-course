import {todoList} from "../../data/todoList.js";
import sequelize from "../models/index.js"
import Todo from "../models/todo.model.js"

export async function postTodo(todo) {

    const t = await sequelize.transaction();
    try {
        await Todo.create({
            text: todo.text,
            userId: todo.userId,
        }, {transaction: t})

        await t.commit()

    } catch (error) {
        console.log({error})
        await t.rollback()
    }
}

export async function getTodo() {

    return Todo.findAll({})
}

export function getTodoList() {
    return todoList
}

export function idExists(id) {
    return !!todoList.find(toDo => toDo.id === parseInt(id))
}

export function changeStatus(id, status) {
    todoList.find((i) => i.id.toString() === id.toString()).status = status;
}
