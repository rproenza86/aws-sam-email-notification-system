// external dependencies
import { DynamoDB, SES, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
// internal dependencies
import { IEmailInfo } from '../notificationsService/types';
import { sendEmail } from './emailSender';

export const handler = async (emailInfo: IEmailInfo) => {
    let result: any = { success: false, why: 'Error sending email' };

    const emailSentResult: PromiseResult<SES.SendEmailResponse, AWSError> = await sendEmail(
        emailInfo?.content?.message,
        emailInfo.toggles
    );

    if (emailSentResult.MessageId) {
        const dynamodb = new DynamoDB.DocumentClient();
        const tableName = process.env.TABLE_NAME;

        const newItem = {
            id: emailSentResult.MessageId,
            emailMessage: emailInfo?.content?.message,
            sendTo: emailInfo?.content?.id,
            sentTraceData: emailSentResult
        };

        const params = {
            TableName: tableName,
            Item: newItem,
            ConditionExpression: 'attribute_not_exists(id)',
            ReturnConsumedCapacity: 'TOTAL'
        };
        console.log(`Processing email for :`, emailInfo);

        const dbSavingResult = await dynamodb.put(params).promise();
        console.log('Item added with email sent data to table: ' + tableName);

        result = { success: true, dbSavingResult, newItem };
    }

    return result;
};
