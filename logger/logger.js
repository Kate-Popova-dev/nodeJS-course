import fs from "node:fs"
import path from "node:path"
import levels from "./levels.js"
import formatMessage from "./formatter.js"
import errorsType from "../errors/errorsType.js";
import {LOCAL_ENV} from "../variables.js";
import {EventEmitter} from "node:events";

export const event = new EventEmitter();

class Logger {

    constructor(logPath = 'logs/app.log') {
        this.logPath = logPath

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(
                path.dirname(this.logPath),
                {
                    recursive: true
                }
            )
        }
    }

    __additionalErrorTypeChecks(error, errorMessage) {
        switch (error.name) {
            case errorsType.DB:
                errorMessage += `database name: ${error.dbName}, at ${error.stack.split(' at ')[1]} \n`;
                break;
            case errorsType.PERMISSION:
                errorMessage += `user name: ${error.user}, at ${error.stack.split(' at ')[1]} \n`;
                break;
            case errorsType.LEMON:
                errorMessage += `Who made me: ${error.whoMadeMe}, at ${error.stack.split(' at ')[1]} \n`;
                break;
        }
        return errorMessage;
    }

    __log(level, msg) {

        if (msg instanceof Error) {
            let info = `type : ${msg.name}, message: ${msg.message}, at ${msg.stack.split(' at ')[1]}`;

            if (msg instanceof AggregateError) {
                info += `\n List of errors: `
                msg.errors.map((i, index) => {
                    info += `\n ${index}. type : ${i.name}, message: ${i.message},  `
                    info = this.__additionalErrorTypeChecks(i, info);
                })
            }
            info = this.__additionalErrorTypeChecks(msg, info);
            msg = info;
        }

        const formattedMsg = formatMessage(level, msg)

        // if (process.env.APP_ENV === LOCAL_ENV) {
        //     console.log(formattedMsg)
        // } else {
        event.on(level, () => {
            setImmediate(() => {
                fs.appendFile(this.logPath, `${formattedMsg} `, (err) => {
                    if (err) {
                        console.error("Error while try to put data to file", err.message)
                    }
                })
                console.log('in logger');
                console.log('level: ', level);
            })
        })
        event.emit(level)
    }

    info(msg) {
        this.__log(levels.INFO, msg)
    }

    warning(msg) {
        this.__log(levels.WARNING, msg)
    }

    error(msg) {
        this.__log(levels.ERROR, msg)
    }
}

export default Logger