// internal dependencies
import { saveToDB } from './saveRecord';
import { sendEmail } from './sendEmail';
// types
import { DbSavingOps, IDbSavingOps } from './types';

export const handler = async (event: AWSLambda.SQSEvent, context: AWSLambda.Context) => {
    const dbSavingOps: DbSavingOps[] = [];

    try {
        event.Records.forEach(record => {
            const savingResult = saveToDB(record);
            dbSavingOps.push(savingResult);
        });
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
