"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const types_1 = require("./types");
/**
 *
 * Function to created db record for the
 * Messages-lambda table
 *
 * FIXME: Find out the real tables and db name
 *
 */
exports.createDbRecord = (fromEventRecord) => {
    const { messageId, body, attributes: { SentTimestamp } } = fromEventRecord;
    const messageDbRecord = {
        id: uuid.v1(),
        message_id: messageId,
        message: body,
        timestamp: SentTimestamp,
        status: types_1.Status.Saved
    };
    return messageDbRecord;
};
