import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {

    const { id } = event.pathParameters;
    const { amount } = event.body;

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


