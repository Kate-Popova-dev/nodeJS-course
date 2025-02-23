import {Router} from "express"
import {todoValidator} from "../../utils/helpers.js";

const toDoList = [
    {"id": 0, status: 'new', text: 'My message0', "createdAt": "23.02.2025"},
    {"id": 1, status: 'done', text: 'My message1', "createdAt": "23.02.2025"},
];
export const toDoRouter = Router();
let idCounter = toDoList.length;

toDoRouter.route("/items")
    .get((req, res) => {
        res.json({"method": "get", "response": "response from toDoRouter", toDoList})
    })
    .post((req, res) => {
        req.body.data.forEach(item => {
            if (todoValidator(item)) {
                item["id"] = idCounter++;
                item["createdAt"] = new Date().toLocaleDateString();
                toDoList.push(item);
            }
        })
        res.json({"method": "post"})
    });

toDoRouter.get("/items/:itemId", (req, res) => {

    let toDoItem = toDoList.find((i) => i.id.toString() === req.params.itemId);
    if (toDoItem) {
        res.json({toDoItem});
    } else {
        res.status(404).send("Not found itemId");
    }
});
toDoRouter.put("/items/:itemId", (req, res) => {

    let toDoItem = toDoList.find((i) => i.id.toString() === req.params.itemId);

    if (toDoItem && todoValidator(req.body.data, ['status'])) {
        toDoItem.status = req.body.data.status;
        res.send(req.url);
    } else {
        res.status(404).send("Not found itemId");
    }
});
toDoRouter.delete("/items/:itemId", (req, res) => {
    let result = toDoList.findIndex((i) => i.id.toString() === req.params.itemId)
    if (result >= 0) {
        toDoList.splice(result, 1);
        res.send(req.url)
    } else {
        res.status(404).send("Not found itemId");
    }
});
