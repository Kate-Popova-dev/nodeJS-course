import express from "express";
import path from "node:path";
import {toDoRouter} from "./src/routes/todo.js";
import {fileURLToPath} from "node:url";
import {restriction} from "./src/middleware/request-restriction.js"
import Logger from "./logger/logger.js";

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname);

const logger = new Logger();

const APP_PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use(restriction);
app.use("/todo", toDoRouter);

app.use((req, res, next) => {
    res.status(404).send("Not Found")
})

app.use((error, req, res, next) => {
    console.log({
        msg: error?.message
    })
    res.status(500).send("error on server side")
})

app.listen(APP_PORT, () => {
    logger.info(`Express is listening on port ${APP_PORT}`)
})