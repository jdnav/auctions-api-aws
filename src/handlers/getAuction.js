import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * This function returns the auction that matches the given id
 * @param {*} id 
 * @returns Auction
 */
export async function getAuctionById(id) {

    let auction;

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

    return auction;
}

/**
 * This function handles the request to return an auction
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
async function getAuction(event, context) {

    const { id } = event.pathParameters;
    const auction = await getAuctionById(id);

    return {
        statusCode: 200,
        body: JSON.stringify(auction)
    }
}

// Function wrapped with commonMiddleware
export const handler = commonMiddleware(getAuction);


