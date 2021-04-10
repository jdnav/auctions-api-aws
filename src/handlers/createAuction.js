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
  const endDate = new Date();
  // The auction will be ended after 1h
  endDate.setHours(now.getHours() + 1);

  const auction = {
    //title: body.tile
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    endingAt: endDate,
    highestBid: {
      amount: 0,
    }
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


