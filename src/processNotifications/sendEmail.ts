import { Lambda } from 'aws-sdk';
import { IMessageRecord } from './types';
/**
 *
 * This will invoke the lambda function sendEmails
 */
export const sendEmail = async (message: IMessageRecord) => {
    const lambda = new Lambda();
    const functionName = process.env.FUNCTION_NAME;

    const payload = {
        source: 'invokeFunction',
        content: message
    };

    // Construct parameters for the invoke call
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };

    const result = await lambda.invoke(params).promise();
    console.log(functionName + ' invoked');
    console.log(result);
};
