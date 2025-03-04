import express from "express";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {restriction} from "./src/middleware/request-restriction.js"
import Logger from "./logger/logger.js";
import {router} from "./src/routes/index.js"
import session from "express-session";

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname);

const logger = new Logger();

const APP_PORT = 3000;

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// app.use(restriction);
app.use("/", router);

app.use((req, res, next) => {
    res.status(404).send("Not Found")
})

// app.use((error, req, res, next) => {
//     console.log({
//         msg: error?.message
//     })
//     res.status(500).send("error on server side")
// })

app.listen(APP_PORT, () => {
    logger.info(`Express is listening on port ${APP_PORT}`)
})