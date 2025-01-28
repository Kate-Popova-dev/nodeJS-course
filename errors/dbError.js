import MyError from "./myError.js";

class DbError extends MyError {
    _dbName = process.env['DB_NAME'];

    constructor(message) {
        super(message);
    }

    get dbName() {
        return this._dbName;
    }
}

export default DbError;