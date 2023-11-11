import { addTourneyToStatStore } from "./addTourney";

import { fetchTournies } from "./doFetch";
import { FIRST_PLACE, SECOND_PLACE, SUBDOMAIN, THIRD_PLACE } from "../../src-shared/constants";
import { apiSource, iStatStore, iTournament } from "../../src-shared/types";




// Iterate through all tournaments, 
// returning statStore
export const generateStatStore = async (source: apiSource) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;

    const tourneys = await fetchTournies(endpoint, source);
    const statStore = await iterate(tourneys, source);
    return statStore;
};

const iterate = async (tourneys: iTournament[], source: apiSource) => {
    let statStore = emptyStatStore();
    for (const tourney of tourneys) {
        console.log(tourney.tournament.name)
        const tourneyId = tourney.tournament.id;
        statStore = await addTourneyToStatStore(tourneyId, statStore, source);
    }
    return statStore;
};

export const emptyStatStore = (): iStatStore => {
    return {
        podiumFinishes: {
            [FIRST_PLACE]: {},
            [SECOND_PLACE]: {},
            [THIRD_PLACE]: {}
        },
        h2h: {}
    }
}