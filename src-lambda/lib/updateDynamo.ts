
import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { iPlayer, iStatStore } from "../../src-shared/types";
import { checkTourneyCount, getTourneys } from "./checkTourneyCount";
import { fetchTournies } from "./challongeFetch";
import { putSummitMetadata, putPlayer, getAllPlayers, removePlayer, putTourney } from "./dynamo";
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

// Actually push data, updating website
export const executeUpdate = async (statStore: iStatStore) => {
    await putSummitMetadata(statStore);
    const players = getWinLoss(statStore);
    await removeDeprecatedPlayers(players);
    await Promise.all(players.map(player => putPlayer(player)));
    const tourneysInDynamo = await getTourneys(DYNAMO);

    // Create lookup of existing Tournament IDs:
    const tourneysInDynamoLookup = tourneysInDynamo.reduce((lv, cv) => {
        lv[cv.tournament.id] = true;
        return lv;
    }, {} as { [index: number]: boolean });

    // Only put tournaments into Dynamo that don't exist yet
    await Promise.all(statStore.tourneys.map(tourney => {
        if (!(tourney.tournament.id in tourneysInDynamoLookup)) {
            putTourney(tourney);
        }
    }));
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