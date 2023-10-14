import { addTourneyToStatStore } from "./addTourney";

import { doFetch } from "./doFetch";
import { FIRST_PLACE, SECOND_PLACE, SUBDOMAIN, THIRD_PLACE } from "../constants/constants";




// Iterate through all tournaments, 
// returning statStore
export const generateStatStore = async (source: apiSource) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;
    const debug = false;

    const tourneys = await doFetch(endpoint, source);
    const statStore = await iterate(tourneys, source, debug);
    return statStore;
};

const iterate = async (tourneys: iTournament[], source: apiSource, debug = false) => {
    let statStore = emptyStatStore;
    let counter = 1;
    for (const tourney of tourneys) {
        console.log(tourney.tournament.name)
        const tourneyId = tourney.tournament.id;
        statStore = await addTourneyToStatStore(tourneyId, statStore, source);
        if (debug) {
            counter += 1;
            if (counter > 2) {
                break;
            }
        }
    }
    return statStore;
};

const emptyStatStore: iStatStore = {
    podiumFinishes: {
        [FIRST_PLACE]: {},
        [SECOND_PLACE]: {},
        [THIRD_PLACE]: {}
    },
    h2h: {}
}