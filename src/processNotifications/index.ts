import { PromiseResult } from 'aws-sdk/lib/request';

import { saveToDB } from './saveRecord';
import { sendEmail } from './sendEmail';

exports.handler = async (event: AWSLambda.SQSEvent, context: AWSLambda.Context) => {
    const dbSavingOps: Promise<void | PromiseResult<
        AWS.DynamoDB.DocumentClient.PutItemOutput,
        AWS.AWSError
    >>[] = [];

    try {
        event.Records.forEach(async record => {
            const savingResult = saveToDB(record);
            dbSavingOps.push(savingResult);
        });
        await Promise.all(dbSavingOps);
        await sendEmail({ msg: 'Hello sendEmails lambda function' }); // TODO: This call can be async
    } catch (error) {
        console.log(
            `Error writing to table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`
        );
        throw new Error(error);
    }

    const response: object = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: 'Success!'
    };

    return response;
};
