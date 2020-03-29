import { PromiseResult } from 'aws-sdk/lib/request';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';

export enum Status {
    Saved = 'Saved' // FIXME: This is on TBD
}

export interface IMessageRecord {
    id: string;
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

export interface IFindRecordResult {
    found: boolean;
    record: null | GetItemOutput;
    error?: null | Error;
}
