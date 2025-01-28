import MyError from "./myError.js";

class LemonError extends MyError {
    _whoMadeMe = process.env['user'];

    constructor(message,) {
        super(`This '${message}' is UNACCEPTABLE!!!`);
    }

    set whoMadeMe(whoMadeMe) {
        this._whoMadeMe = whoMadeMe;
    }

    get whoMadeMe() {
        return this._whoMadeMe;
    }
}

export default LemonError;