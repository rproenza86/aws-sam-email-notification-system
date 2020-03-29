// internal dependencies
import { saveToDB } from './saveRecord';
import { sendEmail } from './sendEmail';
import { getNotificationAuth } from './getNotificationAuth';
import { isNewNotification } from './findRecord';
// types
import { DbSavingOps, IToggles } from './types';

export const handler = async (event: AWSLambda.SQSEvent) => {
    const dbSavingOps: DbSavingOps[] = [];

    console.log('sqsEvent: ', JSON.stringify(event));

    try {
        for (const record of event.Records) {
            const shouldProcessNotification = await isNewNotification(record.messageId);
            console.log('isNewNotification ', shouldProcessNotification);

            if (shouldProcessNotification) {
                const isEmailAuthorized = await getNotificationAuth();

                if (isEmailAuthorized?.message === 'Email notifications authorized') {
                    const savingResult = saveToDB(record);
                    dbSavingOps.push(savingResult);
                }
            }
        }

        const dbSavingResults = await Promise.all(dbSavingOps);

        for (const resultIndex in dbSavingResults) {
            const result = dbSavingResults[resultIndex];
            const notificationToggles: IToggles = JSON.parse(
                event.Records[resultIndex].messageAttributes?.Toggles?.stringValue || '{}'
            );

            if (result && result?.savedRecord?.id) {
                const sendEmailResult = await sendEmail(result.savedRecord, notificationToggles);
                console.log('sendEmailResult :', sendEmailResult);
            }
        }
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
