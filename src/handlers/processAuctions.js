import { getEndedAuctions } from '../lib/getEndedAuctions';
import { closeAuction } from '../lib/closeAuction';
import createError from 'http-errors';

async function processAuctions(event, context) {

    try {
        // get array of closed auctions
        const auctionsToClose = await getEndedAuctions();

        // For each iteration it returns the promise result of each auction that needs to be closed
        const closePromises = auctionsToClose.map(auction => closeAuction(auction));

        // It waits for all promises to be finished
        await Promise.all(closePromises);

        // this function is NOT triggered by API Gateway so it can return anything (otherwise HTTP-structure)
        return { closed: closePromises.length };

    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

}

export const handler = processAuctions;