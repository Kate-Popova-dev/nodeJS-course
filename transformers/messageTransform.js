import {Transform} from 'node:stream'
import levels from "../logger/levels.js";
import chalk from "chalk";

class MessageTransform extends Transform {
    constructor(options) {
        super({...options, objectMode: true});
        this.msg = '';
    }

    _transform(chunk, encoding, callback) {
        const timestamp = new Date().toISOString()

        switch (chunk.level) {
            case levels.INFO:
                this.msg = chalk.blue(`[${timestamp}], INFO: ${chunk.message}`)
                break;
            case levels.WARNING:
                this.msg = chalk.yellow(`[${timestamp}], INFO: ${chunk.message}`)
                break;
            case levels.ERROR:
                this.msg = chalk.red(`[${timestamp}], INFO: ${chunk.message}`)
                break;
            case levels.EXCEPTION:
                this.msg = chalk.magenta(`[${timestamp}], INFO: ${chunk.message}`)
                break;
            default:
                this.msg = chalk.gray(`[${timestamp}], INFO: ${chunk.message}`)
        }
        callback(null, this.msg);
    }
}

export default MessageTransform;
