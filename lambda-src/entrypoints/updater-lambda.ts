import { Handler } from "aws-lambda";

import { DYNAMO, CHALLONGE, getIsTesting } from "../constants/constants";
import { checkTourneyCount } from "../lib/checkTourneyCount";
import { putPodiumFinishes, putPlayer } from "../lib/dynamo";
import { generateStatStore } from "../lib/generateStatStore";
import { getWinLoss } from "../lib/parseWinLoss";

export const handler: Handler = async (event, context) => {
    const dynamoCount = await checkTourneyCount(DYNAMO);
    const challongeCount = await checkTourneyCount(CHALLONGE);

    // We could add an override here
    // to force an update, if a prior
    // update failed
    if (challongeCount > dynamoCount) {
        console.log('New tournaments found! Update dynamo')
        const statStore = await generateStatStore(CHALLONGE);
        // Actually push data, updating website
        // Don't push this update when testing from local
        if (!getIsTesting()) {
            await putPodiumFinishes(statStore);
            const players = getWinLoss(statStore);
            await Promise.all(players.map(player => putPlayer(player)));
        }
        // end push

    } else if (challongeCount == dynamoCount) {
        console.log('No new tournaments, exiting');
    }
    else {
        throw new Error('Fewer tournaments on Challonge than Dynamo, this should should never happen.');
    }
    console.log('Done');
};
