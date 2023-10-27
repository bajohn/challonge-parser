
import { DYNAMO, CHALLONGE, getIsTesting } from "../constants/constants";
import { checkTourneyCount } from "../lib/checkTourneyCount";
import { putPodiumFinishes, putPlayer } from "../lib/dynamo";
import { generateStatStore } from "../lib/generateStatStore";
import { getWinLoss } from "../lib/parseWinLoss";


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