import { Lambda } from 'aws-sdk';
import { IMessageRecord, IToggles } from './types';
/**
 *
 * This will invoke the lambda function sendEmailService
 */
export const sendEmail = async (message: IMessageRecord, toggles: IToggles) => {
    const lambda = new Lambda();
    const functionName = process.env.FUNCTION_NAME;

    const payload = {
        source: 'invokeFunction',
        content: message,
        toggles
    };

    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };

    const result = await lambda.invoke(params).promise();
    console.log(functionName + ' invoked');
    console.log(result);
};
