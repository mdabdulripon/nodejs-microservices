import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super(`Not Authorized`);

         // ? Only because we are extending a built in class 
         Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors() {
        return [ { message: 'Not Authorized'} ]
    }

}