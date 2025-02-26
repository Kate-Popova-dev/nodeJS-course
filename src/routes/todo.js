import {Router} from "express"
import {getTodoList} from "../controllers/todo.controllers.js";
import {logMiddleware} from "../middleware/logs.js";
import {createTodoValidator, itemIdValidator, updateTodoValidator} from "../validators/todo.validator.js";
import {createToDo} from "../controllers/todo.controllers.js";
import {changeToDo} from "../controllers/todo.controllers.js";

export const toDoRouter = Router();

toDoRouter.get("/items", getTodoList);
toDoRouter.put("/items/:itemId", logMiddleware, itemIdValidator, updateTodoValidator, changeToDo);
toDoRouter.post("/items", logMiddleware, createTodoValidator, createToDo)



