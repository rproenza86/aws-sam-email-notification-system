import { SES } from 'aws-sdk';
// internal dependencies
import { createEmailParams } from './emailCreator';
// types
import { IToggles } from '../notificationsService/types';

export const sendEmail = async (
    message: string = 'Amazon SES Test (SDK for JavaScript in Node.js)',
    emailToggles: IToggles
) => {
    const ses = new SES();

    try {
        const emailParams = createEmailParams(message, emailToggles);
        const data = await ses.sendEmail(emailParams).promise();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
