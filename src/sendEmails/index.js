"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async (event = {}) => {
    // Log the event argument for debugging and for use in local development.
    const response = JSON.stringify(event, undefined, 2);
    console.log(response);
    return response;
};
