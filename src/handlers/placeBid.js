import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';
import { getAuctionById } from './getAuction'

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * This function places a new bid as long as the amount is higher than previous one and the auction is still opened
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
async function placeBid(event, context) {

    const { id } = event.pathParameters;
    const { amount } = event.body;

    // Before making the update, let's check if bid amount is higher than previous one
    const auction = await getAuctionById(id);

    // Check if auction is opened
    if (auction.status.toUpperCase() !== 'OPEN') {
        throw new createError.Forbidden(`You cannot bid on closed auctions.`)
    }

    // Check if amount is higher than previous one
    if (amount <= auction.highestBid.amount) {
        throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}`)
    }

    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME, // in this table...
        Key: { id }, // ...take the auction with this id...
        UpdateExpression: 'set highestBid.amount = :amount', // :amount is the actual amount coming from { amount }
        ExpressionAttributeValues: {
            ':amount': amount, // replace :amount 
        },
        ReturnValues: 'ALL_NEW' // when dynamo is done, we'll receive it
    };

    let updatedAuction;

    try {
        const result = await dynamodb.update(params).promise();
        updatedAuction = result.Attributes;

    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction)
    }
}

// Function wrapped with commonMiddleware
export const handler = commonMiddleware(placeBid);


