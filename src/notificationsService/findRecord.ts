import { DynamoDB } from 'aws-sdk';
import { IFindRecordResult } from './types';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';

export const findRecord = async (byId: string): Promise<IFindRecordResult> => {
    const dynamodb = new DynamoDB.DocumentClient();
    const tableName = process.env.TABLE_NAME;

    let result: IFindRecordResult = {
        found: false,
        record: null,
        error: null
    };

    const params = {
        TableName: tableName, // get the table name from the automatically populated environment variables
        Key: {
            id: byId
        }
    };

    try {
        const record: GetItemOutput = await dynamodb.get(params).promise();

        if (record && record.Item) {
            console.log(`Found item ${byId} into to table ${tableName}.`, record);
            result = { found: true, record };
        }
    } catch (error) {
        console.log(
            `Error searching for record  ${byId} on table ${tableName}. The entry may already exist.`
        );
        console.log(error.message);
        result.error = error;
    }

    return result;
};

export const isNewNotification = async (notificationId: string): Promise<boolean> => {
    let isNew = true;

    const notificationLookup = await findRecord(notificationId);

    if (notificationLookup?.record?.Item) {
        isNew = false;
    }

    return isNew;
};
