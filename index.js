import Logger from "./logger/logger.js";
import PermissionError from "./errors/permissionError.js";
import LemonError from "./errors/lemonError.js";
import DbError from "./errors/dbError.js";

const logger = new Logger()

// 1. Check logger use AggregateError with array errors

try {
    throw new AggregateError(
        [new Error("one error"), new PermissionError('two error')],
        "I have something for you:");
} catch (e) {
    logger.error(e)
}

// 2. Checking different errors

try {
    throw new SyntaxError("Привет");
// null instanceof 1;
// eval("hoo bar");
// throw new DbError('My db Error');
} catch (e) {
    logger.info(e)
}
logger.warning(new LemonError('Error message'));

