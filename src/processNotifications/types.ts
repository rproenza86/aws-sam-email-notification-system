import { PromiseResult } from 'aws-sdk/lib/request';

export enum Status {
    Saved = 'Saved' // FIXME: This is on TBD
}

export interface IMessageRecord {
    id: string;
    message_id: string;
    message: string;
    timestamp: string;
    status: Status;
}

export interface IDbSavingOps {
    result: PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>;
    savedRecord: IMessageRecord;
}

export type DbSavingOps = Promise<void | IDbSavingOps>;

export interface IEmailInfo {
    source: string;
    content: IMessageRecord;
}
