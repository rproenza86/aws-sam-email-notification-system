// external dependencies
import { DynamoDB } from 'aws-sdk';

export const handler = async (event: AWSLambda.SNSEvent, context: AWSLambda.Context) => {
    const updates = [];
    let result: any = { success: true, updates, event };

    for (const bounceEvent of event.Records) {
        const messageId = (bounceEvent.Sns.Message as any)?.mail?.messageId;

        if (messageId) {
            const dynamodb = new DynamoDB.DocumentClient();
            const tableName = process.env.TABLE_NAME;

            const params = {
                TableName: tableName,
                Key: {
                    id: messageId
                },
                UpdateExpression: 'set sentTraceData=:r',
                ExpressionAttributeValues: {
                    ':r': bounceEvent.Sns.Message
                },
                ReturnValues: 'UPDATED_NEW'
            };
            console.log(`Processing email bounced!`);

            const dbUpdateResult = await dynamodb.update(params).promise();

            console.log('Item updated with email bounce data on table: ' + tableName);

            updates.push({
                dbUpdateResult,
                bounceEvent: bounceEvent.Sns.Message
            });
        }
    }

    console.log(result);
    return result;
};
