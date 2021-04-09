import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

// Creates a DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

  // const body = JSON.parse(event.body);
  const { title } = JSON.parse(event.body);

  const now = new Date();

  const auction = {
    //title: body.tile
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  }

  // Create the new item in the db
  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;


