"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saveRecord_1 = require("./saveRecord");
exports.handler = async (event, context) => {
    const dbSavingOps = [];
    try {
        event.Records.forEach(async (record) => {
            const savingResult = saveRecord_1.saveToDB(record);
            dbSavingOps.push(savingResult);
        });
        await Promise.all(dbSavingOps);
    }
    catch (error) {
        console.log(`Error writing to table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
        throw new Error(error);
    }
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: 'Success!'
    };
    return response;
};
