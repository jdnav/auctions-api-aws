# Auctions REST API on AWS
This REST API allows users to manage Auctions easily (create, bid, close, notify the winner). The project is developed using the following:
- Serverless Architecture `(Serverless Framework)`
- REST API and CRUD endpoints `(AWS Lambda, API Gateway)`
- Data persistence `(AWS DynamoDB)`
- Message Queues for cross-service communication `(AWS SQS)`
- Scheduled event triggers `(AWS EventBridge)`
- Cloud stack management `(AWS CloudFormation)`
- Object storage on the cloud `(AWS S3)`
- Email notifications `(AWS SES)`
- Middleware `(middy)`
- Authentication and Authorization `(Lambda Authorizer)`
- Data validation and error handling

# Useful docs
## Serverless Framework
Develop, deploy, troubleshoot and secure your serverless applications.
https://www.serverless.com/framework/docs/

### Deploy all
`serverless deploy -v`

### Deploy just one function (lambda)
`serverless deploy -f FUNC_NAME -v`

### Invoke one function (lambda)
`serverless invoke -f FUNC_NAME -l`

## Middleware
Middy is a very simple middleware engine that allows you to simplify your AWS Lambda code when using Node.js.
https://github.com/middyjs/middy
`npm i @middy/core @middy/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser`
`npm i http-errors`

## createAuction.js
### create item dynamoDB
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property

## getAuction.js
### get item dynamoDB
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property

## getAuctions.js
### get/scan items dynamoDB
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property

## placeBid.js
### update item dynamoDB
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property

## getEndedAuctions.js
### access items from a table by primary key or a secondary index
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property