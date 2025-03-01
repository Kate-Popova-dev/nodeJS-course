import {Router} from "express"
import {todoList} from "../../data/todoList.js";

export const viewRouter = Router()

const users = [
    {name: "John", age: 30},
    {name: "Anna", age: 22},
]

viewRouter.get("/", (req, res) => {
    res.render("index", {title: "Some title", users})
})

viewRouter.get("/about", (req, res) => {
    res.render("index", {title: "About title", users})
})
viewRouter.get("/todo", (req, res) => {
    res.render("todo", {title: "Todo List", todoList})
})