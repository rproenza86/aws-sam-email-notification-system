import { DynamoDB, AWSError } from 'aws-sdk';
import * as uuid from 'uuid';
// internal dependencies
import { IEmailInfo } from '../processNotifications/types';

export const handler = async (emailInfo: IEmailInfo) => {
    const dynamodb = new DynamoDB.DocumentClient();
    const tableName = process.env.TABLE_NAME;

    const params = {
        TableName: tableName,
        Item: {
            id: uuid.v1(),
            emailMessage: emailInfo?.content?.message,
            sendTo: emailInfo?.content?.message_id
        },
        ConditionExpression: 'attribute_not_exists(id)',
        ReturnConsumedCapacity: 'TOTAL'
    };
    console.log(`Processing email for :`, emailInfo);

    const dbSavingResult = await dynamodb.put(params).promise();
    const result = { dbSavingResult, emailInfo };

    console.log('Item added to table: ' + tableName);

    return result;
};
