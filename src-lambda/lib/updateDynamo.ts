
import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { iPlayer, iStatStore, iTournamentData } from "../../src-shared/types";
import { checkTourneyCount } from "./checkTourneyCount";
import { dyPutSummitMetadata, dyPutPlayer, dyGetAllPlayers, dyRemovePlayer, dyPutTourney, dyGetAllTourneys, dyPutH2h, dyRemoveH2h, dyGetAllH2h } from "./dynamo";
import { generateStatStore } from "./generateStatStore";
import { getWinLoss } from "./parseWinLoss";


export const updateDynamo = async (forceUpdate: boolean = false) => {


    // More efficient, but could miss updates
    // const dynamoCount = await checkTourneyCount(DYNAMO);

    // This forces a scan of the SummitTourneys table on every run
    const dyTourneys = await dyGetAllTourneys();
    const dynamoCount = dyTourneys.tournaments.reduce((lv: number, cv: iTournamentData) => {
        if (cv.state === 'complete') {
            lv += 1;
        }
        return lv;
    }, 0);

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

    await Promise.all(statStore.tourneys.map(async (tourney) => {
        // Only put tournaments into Dynamo that don't exist yet
        //if (!(tourney.tournament.id in tourneysInDynamoLookup)) {
        return dyPutTourney(tourney);
        //}
    }));


    await Promise.all(Object.keys(statStore.h2h).map(playerName => {
        return dyPutH2h(playerName, statStore.h2h[playerName]);
    }));
    // end push
};

export const removeDeprecatedPlayers = async (newPlayers: iPlayer[]) => {
    const playersInDynamo = await dyGetAllPlayers();
    const h2hInDynamo = await dyGetAllH2h();
    const newPlayerLookup = newPlayers.reduce((lv, cv) => {
        lv[cv.playerName] = true;
        return lv;
    }, {} as { [key: string]: boolean });

    for (const player of playersInDynamo.players) {
        if (!(player.playerName in newPlayerLookup)) {
            await Promise.all([
                dyRemovePlayer(player.playerName),
                // dyRemoveH2h(player.playerName)
            ]);
        }
    }
};