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
`npm i @middy/core @middy/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser @middy/validator`
`npm i http-errors`

## JSON Schema
- https://json-schema.org/

## DynamoDB SDK
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html