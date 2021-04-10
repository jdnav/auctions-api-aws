import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
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

// Function wrapped in middleware
export const handler = middy(createAuction)
  .use(httpJsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(httpEventNormalizer()) // Adjust the api gateway event objects to prevent accidental wrong params. It reduces room for errors
  .use(httpErrorHandler()); // handles common http errors and returns proper responses


