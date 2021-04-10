import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {

    let auction;
    const { id } = event.pathParameters;

    try {
        const result = await dynamodb.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id }
        }).promise();

        // Return a single item
        auction = result.Item;

    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    // If item does NOT exits
    if (!auction) {
        throw new createError.NotFound(`Auction with ID "${id}" not found`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auction)
    }
}

// Function wrapped with commonMiddleware
export const handler = commonMiddleware(getAuction);


