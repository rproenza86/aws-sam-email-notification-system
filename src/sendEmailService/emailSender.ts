import { SES } from 'aws-sdk';
import { createEmailParams } from './emailCreator';

export const sendEmail = async (
    message: string = 'Amazon SES Test (SDK for JavaScript in Node.js)'
) => {
    const ses = new SES();

    try {
        const emailParams = createEmailParams(message);
        const data = await ses.sendEmail(emailParams).promise();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
