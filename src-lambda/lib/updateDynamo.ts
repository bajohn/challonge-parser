
import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { iPlayer, iStatStore } from "../../src-shared/types";
import { checkTourneyCount } from "./checkTourneyCount";
import { putPodiumFinishes, putPlayer, getAllPlayers, removePlayer, putTourneyMeta } from "./dynamo";
import { generateStatStore } from "./generateStatStore";
import { getWinLoss } from "./parseWinLoss";


export const updateDynamo = async (forceUpdate: boolean = false) => {

    const dynamoCount = await checkTourneyCount(DYNAMO);
    const challongeCount = await checkTourneyCount(CHALLONGE);

    if (forceUpdate || challongeCount > dynamoCount) {
        console.log('New tournament(s) found! Updating dynamo.')
        const statStore = await generateStatStore(CHALLONGE);
        await executeUpdate(statStore);

    } else if (challongeCount == dynamoCount) {
        console.log('No new tournaments, exiting');
    }
    else {
        throw new Error('Fewer tournaments on Challonge than Dynamo, this should should never happen.');
    }
    console.log('Done');
}

export const executeUpdate = async (statStore: iStatStore) => {
    // Actually push data, updating website
    await putPodiumFinishes(statStore);
    const players = getWinLoss(statStore);
    await removeDeprecatedPlayers(players);
    await Promise.all(players.map(player => putPlayer(player)));
    
    await Promise.all(statStore.tourneys.map(tourney=>putTourneyMeta(tourney)))
    // end push
}

export const removeDeprecatedPlayers = async (newPlayers: iPlayer[]) => {
    const playersInDynamo = await getAllPlayers();
    const newPlayerLookup = newPlayers.reduce((lv, cv) => {
        lv[cv.playerName] = true;
        return lv;
    }, {} as { [key: string]: boolean });

    for (const player of playersInDynamo.players) {
        if (!(player.playerName in newPlayerLookup)) {
            await removePlayer(player.playerName);
        }
    }
}