import * as AWS from 'aws-sdk';

import { IExpirationKeyServicePayload } from './types';

export const handler = async (event: AWSLambda.APIGatewayEvent) => {
    let response;

    try {
        const sqs = new AWS.SQS();

        const payload: IExpirationKeyServicePayload = JSON.parse(event.body);
        console.log('payload', payload);

        const toggles: any = { ...payload };
        delete toggles.message;

        const params = {
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: 'String',
                    StringValue: 'The Whistler'
                },
                Author: {
                    DataType: 'String',
                    StringValue: 'John Grisham'
                },
                WeeksOn: {
                    DataType: 'Number',
                    StringValue: '6'
                },
                Toggles: {
                    DataType: 'String',
                    StringValue: JSON.stringify(toggles)
                }
            },
            MessageBody:
                payload?.message ||
                'Information about current NY Times fiction bestseller for week of 12/11/2016.',
            QueueUrl: process.env.QUEUE_URL
        };

        const sendMessageResult = await sqs.sendMessage(params).promise();

        response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Expired key sent to sqs queue.', sendMessageResult })
        };
    } catch (err) {
        console.log(err);
        return err;
    }
    return response;
};
