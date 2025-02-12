import fs from "node:fs"
import levels from "./levels.js"
import errorsType from "../errors/errorsType.js";
import {LOCAL_ENV} from "../variables.js";
import {EventEmitter} from "node:events";
import MessageTransform from "../transformers/messageTransform.js";
import formatMessage from "./formatter.js";

export const event = new EventEmitter();

class Logger {

    constructor(logPath = 'logs/app.log') {
        this.logPath = logPath
        this.writeStream = fs.createWriteStream(this.logPath, {
            encoding: "utf8",
            flags: "a"
        })
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

        if (process.env.APP_ENV !== LOCAL_ENV) {
            console.log(formattedMsg);
        } else {
            setImmediate(() => {
                const msgTransform = new MessageTransform();
                msgTransform.pipe(this.writeStream);
                msgTransform.write({'message': msg, 'type': level});
            })
        }
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