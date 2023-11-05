
import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { checkTourneyCount } from "./checkTourneyCount";
import { putPodiumFinishes, putPlayer } from "./dynamo";
import { generateStatStore } from "./generateStatStore";
import { getWinLoss } from "./parseWinLoss";


export const updateDynamo = async (forceUpdate: boolean = false) => {

    const dynamoCount = await checkTourneyCount(DYNAMO);
    const challongeCount = await checkTourneyCount(CHALLONGE);

    if (forceUpdate || challongeCount > dynamoCount) {
        console.log('New tournament(s) found! Updating dynamo.')
        const statStore = await generateStatStore(CHALLONGE);
        // Actually push data, updating website
        await putPodiumFinishes(statStore);
        const players = getWinLoss(statStore);
        await Promise.all(players.map(player => putPlayer(player)));
        // end push

    } else if (challongeCount == dynamoCount) {
        console.log('No new tournaments, exiting');
    }
    else {
        throw new Error('Fewer tournaments on Challonge than Dynamo, this should should never happen.');
    }
    console.log('Done');
}