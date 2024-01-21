import { SUBDOMAIN } from "../../src-shared/constants";
import { fetchTournies } from "./doFetch";
import { apiSource, iTournament } from "../../src-shared/types";


export const checkTourneyCount = async (source: apiSource) => {
    const tourneys = await getTourneys(source);
    const tourneyCount = tourneys.reduce((lv: number, cv: iTournament) => {
        if (cv.tournament.state === 'complete') {
            lv += 1;
        }
        return lv;
    }, 0);
    console.log(`Tournament count check, ${source}: ${tourneyCount}`);
    return tourneyCount;
};


export const getTourneys = async (source: apiSource) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;
    const tourneys = await fetchTournies(endpoint, source);
    return tourneys;
};