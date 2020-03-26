"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const utils_1 = require("./utils");
exports.saveToDB = async (sqsRecord) => {
    const dynamodb = new aws_sdk_1.DynamoDB.DocumentClient();
    const sqsMessage = {
        TableName: process.env.TABLE_NAME,
        Item: utils_1.createDbRecord(sqsRecord),
        ConditionExpression: 'attribute_not_exists(id)',
        ReturnConsumedCapacity: 'TOTAL'
    };
    return dynamodb
        .put(sqsMessage)
        .promise()
        .then((result) => {
        console.log(`Writing item ${sqsMessage.Item.id} to table ${process.env.TABLE_NAME}.`);
        return result;
    })
        .catch(error => {
        console.log(`Error writing ${sqsMessage.Item.id} to table ${process.env.TABLE_NAME}. The entry may already exist.`);
        console.log(error.message);
    });
};
