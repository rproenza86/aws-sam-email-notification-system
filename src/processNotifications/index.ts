// internal dependencies
import { saveToDB } from './saveRecord';
import { sendEmail } from './sendEmail';
import { getNotificationAuth } from './getNotificationAuth';
// types
import { DbSavingOps, IDbSavingOps } from './types';

export const handler = async (event: AWSLambda.SQSEvent, context: AWSLambda.Context) => {
    const dbSavingOps: DbSavingOps[] = [];

    try {
        for (const record of event.Records) {
            let authResult;
            try {
                authResult = await getNotificationAuth();
            } catch (error) {
                console.log(error);
            }
            if (authResult?.message === 'Email notifications authorized') {
                const savingResult = saveToDB(record);
                dbSavingOps.push(savingResult);
            }
        }

        const dbSavingResults = await Promise.all(dbSavingOps);

        dbSavingResults.forEach((result: IDbSavingOps) => {
            if (result?.savedRecord?.id) {
                sendEmail(result.savedRecord);
            }
        });
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
