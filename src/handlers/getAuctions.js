import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * This function returns auctions based on status
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
async function getAuctions(event, context) {

    let auctions;
    const { status } = event.queryStringParameters;

    // query
    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeValues: {
            ':status': status
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        },
    }

    try {
        const result = await dynamodb.query(params).promise();

        // It gets the proper auctions
        auctions = result.Items;

    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auctions)
    }
}

// Function wrapped in commonMiddleware
export const handler = commonMiddleware(getAuctions);
