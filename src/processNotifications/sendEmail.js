"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
/**
 *
 * This will invoke the lambda function sendEmails
 */
exports.sendEmail = async (message) => {
    const lambda = new aws_sdk_1.Lambda();
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
