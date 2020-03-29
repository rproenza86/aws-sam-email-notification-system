import { SQSRecord } from 'aws-lambda';

import { IMessageRecord, Status } from './types';

/**
 *
 * Function to created db record for the
 * Messages-lambda table
 *
 * FIXME: Find out the real tables and db name
 *
 */
export const createDbRecord = (fromEventRecord: SQSRecord) => {
    const {
        messageId,
        body,
        attributes: { SentTimestamp }
    } = fromEventRecord;

    const messageDbRecord: IMessageRecord = {
        id: messageId,
        message: body,
        timestamp: SentTimestamp,
        status: Status.Saved
    };

    return messageDbRecord;
};
