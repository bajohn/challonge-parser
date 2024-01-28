import { addTourneyToStatStore } from "./addTourney";

import { fetchTournies } from "./challongeFetch";
import { FIRST_PLACE, SECOND_PLACE, SUBDOMAIN, THIRD_PLACE } from "../../src-shared/constants";
import { apiSource, iStatStore, iTournament } from "../../src-shared/types";
import { getMinimal } from "./dynamoHelpers";

// Iterate through all tournaments, 
// returning statStore
// TODO: Challonge probably paginates at some point, which will break this logic,
// since it assumes fetchTournies returns all associated tournaments.
export const generateStatStore = async (source: apiSource) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;

    const rawTourneys = await fetchTournies(endpoint, source);
    const tourneys = getMinimal('tournament', rawTourneys);
    const statStore = await iterate(tourneys, source);
    return statStore;
};

const iterate = async (tourneys: iTournament[], source: apiSource) => {
    let statStore = emptyStatStore();
    for (const tourney of tourneys) {
        console.log(tourney.tournament.name)
        statStore = await addTourneyToStatStore(tourney, statStore, source);
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
        h2h: {},
        tourneys: []
    }
}