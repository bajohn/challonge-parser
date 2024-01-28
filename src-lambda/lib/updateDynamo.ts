
import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { iPlayer, iStatStore } from "../../src-shared/types";
import { checkTourneyCount } from "./checkTourneyCount";
import { dyPutSummitMetadata, dyPutPlayer, dyGetAllPlayers, dyRemovePlayer, dyPutTourney, dyGetAllTourneys } from "./dynamo";
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
    await dyPutSummitMetadata(statStore);
    const players = getWinLoss(statStore);
    await removeDeprecatedPlayers(players);
    await Promise.all(players.map(player => dyPutPlayer(player)));
    const tourneysInDynamo = await dyGetAllTourneys();
    // Create lookup of existing Tournament IDs:
    const tourneysInDynamoLookup = tourneysInDynamo.tournaments.reduce((lv, cv) => {
        lv[cv.id] = true;
        return lv;
    }, {} as { [index: number]: boolean });
    // Only put tournaments into Dynamo that don't exist yet
    await Promise.all(statStore.tourneys.map(async (tourney) => {
        if (!(tourney.tournament.id in tourneysInDynamoLookup)) {
            return dyPutTourney(tourney);
        }
    }));

    // end push
}

export const removeDeprecatedPlayers = async (newPlayers: iPlayer[]) => {
    const playersInDynamo = await dyGetAllPlayers();
    const newPlayerLookup = newPlayers.reduce((lv, cv) => {
        lv[cv.playerName] = true;
        return lv;
    }, {} as { [key: string]: boolean });

    for (const player of playersInDynamo.players) {
        if (!(player.playerName in newPlayerLookup)) {
            await dyRemovePlayer(player.playerName);
        }
    }
}