import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

  // const body = JSON.parse(event.body);
  const { title } = event.body;

  const now = new Date();

  const auction = {
    //title: body.tile
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  }

  try {
    // Create the new item in the db
    await dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise();

  } catch (error) {
    console.error(error);
    // it creates the error object
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

// Function wrapped in commonMiddleware
export const handler = commonMiddleware(createAuction);


