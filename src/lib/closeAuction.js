import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * This function close an Auction by its id
 * @param {*} auction to be closed
 * @returns 
 */
export async function closeAuction(auction) {
    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id: auction.id },
        UpdateExpression: 'set #status = :status', // set CURRENT_STATUS = 'CLOSED' where id = auction.id
        ExpressionAttributeValues: {
            ':status': 'CLOSED',
        },
        ExpressionAttributeNames: {
            '#status': 'status',
        }
    };

    // execute this call
    const result = await dynamodb.update(params).promise();
    return result;
}