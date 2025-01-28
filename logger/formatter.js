import chalk from "chalk";
import levels from "./levels.js";

function formatMessage(level, msg) {

    const timestamp = new Date().toISOString()

    switch (level) {
        case levels.INFO:
            return chalk.blue(`[${timestamp}], INFO: ${msg}`)

        case levels.WARNING:
            return chalk.yellow(`[${timestamp}], WARNING: ${msg}`)

        case levels.ERROR:
            return chalk.red(`[${timestamp}], ERROR: ${msg}`)

        case levels.EXCEPTION:
            return chalk.magenta(`[${timestamp}], EXCEPTION: ${msg}`)

        default:
            return chalk.gray(`[${timestamp}], UNKNOW: ${msg}`)
    }

}

export default formatMessage