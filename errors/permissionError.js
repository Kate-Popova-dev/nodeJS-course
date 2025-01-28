import MyError from "./myError.js";

class PermissionError extends MyError {
    _user = process.env['USER'];

    constructor(message) {
        super(message);
    }

    get user() {
        return this._user;
    }
}

export default PermissionError;