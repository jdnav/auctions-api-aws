import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * This function gets all finished Auctions
 * @returns 
 */
export async function getEndedAuctions() {
    // current date
    const now = new Date();

    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status AND endingAt <= :now', // if status is the current one AND ending time is <=
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString()
        },
        ExpressionAttributeNames: {
            '#status': 'status', // it will replace #status with status (only needed when there are reserved words)
        },
    };

    // send the query and get the result
    const result = await dynamodb.query(params).promise();
    return result.Items;
}