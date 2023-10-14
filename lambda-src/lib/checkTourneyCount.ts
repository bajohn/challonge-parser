const { SUBDOMAIN } = require("../constants/constants");
import { doFetch } from "./doFetch";
const { getMetadata, putMetadata } = require("./dynamo");


exports.checkTourneyCount = async (source: apiSource) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;
    const tourneys = await doFetch(endpoint, source) as iTournament[];
    const tourneyCount = tourneys.reduce((lv: number, cv: iTournament) => {
        if (cv.tournament.state === 'complete') {
            lv += 1;
        }
        return lv;
    }, 0);
    console.log(`Tournament count check, ${source}: ${tourneyCount}`);
    return tourneyCount;
};
