// import * as AWS from 'aws-sdk';
import { SQSRecord } from 'aws-lambda';
import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

import { createDbRecord } from './utils';

export const saveToDB = async (sqsRecord: SQSRecord) => {
    const dynamodb = new DynamoDB.DocumentClient();

    const sqsMessage = {
        TableName: process.env.TABLE_NAME, // get the table name from the automatically populated environment variables
        Item: createDbRecord(sqsRecord),
        ConditionExpression: 'attribute_not_exists(id)', // do not overwrite existing entries
        ReturnConsumedCapacity: 'TOTAL'
    };

    return dynamodb
        .put(sqsMessage)
        .promise()
        .then((result: PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>) => {
            console.log(`Writing item ${sqsMessage.Item.id} to table ${process.env.TABLE_NAME}.`);

            return result;
        })
        .catch(error => {
            console.log(
                `Error writing ${sqsMessage.Item.id} to table ${process.env.TABLE_NAME}. The entry may already exist.`
            );
            console.log(error.message);
        });
};
