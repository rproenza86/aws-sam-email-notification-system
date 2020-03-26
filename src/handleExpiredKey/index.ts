import * as AWS from 'aws-sdk';

export const handler = async (
    event: AWSLambda.APIGatewayEvent,
    context: AWSLambda.APIGatewayEventRequestContext
) => {
    let response;

    try {
        const sqs = new AWS.SQS();

        console.log(event);

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
                }
            },
            MessageBody:
                'Information about current NY Times fiction bestseller for week of 12/11/2016.',
            // MessageDeduplicationId: 'TheWhistler', // Required for FIFO queues
            // MessageId: 'Group1', // Required for FIFO queues
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
