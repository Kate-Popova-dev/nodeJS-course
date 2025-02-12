import Logger from "../logger/logger.js";
import LemonError from "../errors/lemonError.js";
import levels from "../logger/levels.js";

class LogEmitter {
    constructor() {
        this.events = new Map()
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(listener)
    }

    emit(eventName, ...arg) {
        if (!this.events[eventName]) return false

        this.events[eventName].forEach(listener => {
            listener(...arg)
        })
    }
}

const emitter = new LogEmitter();
const logger = new Logger();
const EVENT_LOG = 'event_log';

emitter.on(EVENT_LOG, (error, level = levels.ERROR) => {
    switch (level) {
        case levels.INFO:
            logger.info(error);
            break;
        case levels.WARNING:
            logger.warning(error);
            break;
        default:
            logger.error(error);
    }
})

try {
    throw new LemonError('My lemon error');
} catch (e) {
    emitter.emit(EVENT_LOG, e);
}
