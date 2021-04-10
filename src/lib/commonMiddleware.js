import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

export default handler => middy(handler).use(
    [
        httpJsonBodyParser(), // parses the request body when it's a JSON and converts it to an object
        httpEventNormalizer(), // Adjust the api gateway event objects to prevent accidental wrong params. It reduces room for errors
        httpErrorHandler() // handles common http errors and returns proper responses
    ]
);
