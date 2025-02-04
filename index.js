import Logger from "./logger/logger.js";
import DbError from "./errors/dbError.js";

const logger = new Logger();

try {
    throw new DbError('My db Error');
} catch (e) {
    logger.error(e)
}

