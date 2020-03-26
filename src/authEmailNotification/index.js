"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async (event, context) => {
    let response;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email notifications authorized' })
        };
    }
    catch (err) {
        console.log(err);
        return err;
    }
    return response;
};
