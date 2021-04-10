import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {

    let auctions;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.AUCTIONS_TABLE_NAME
        }).promise();

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

// Function wrapped in middleware
export const handler = middy(getAuction)
    .use(httpJsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    .use(httpEventNormalizer()) // Adjust the api gateway event objects to prevent accidental wrong params. It reduces room for errors
    .use(httpErrorHandler()); // handles common http errors and returns proper responses


