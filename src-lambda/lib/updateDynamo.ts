
import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { iPlayer, iStatStore } from "../../src-shared/types";
import { checkTourneyCount, getTourneys } from "./checkTourneyCount";
import { fetchTournies } from "./doFetch";
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

export const executeUpdate = async (statStore: iStatStore) => {
    // Actually push data, updating website
    await putSummitMetadata(statStore);
    const players = getWinLoss(statStore);
    await removeDeprecatedPlayers(players);
    await Promise.all(players.map(player => putPlayer(player)));

    const tourneysInDynamo = await getTourneys(DYNAMO);
    const tourneysInDynamoLookup = tourneysInDynamo.reduce((lv, cv) => {
        lv[cv.tournament.id] = true;
        return lv;
    }, {} as { [index: number]: boolean });

    await Promise.all(statStore.tourneys.map(tourney => {
        // Don't overwrite existing tournaments! 
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