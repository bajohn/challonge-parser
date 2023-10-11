const { SUBDOMAIN } = require("../constants/constants");
const { doFetch } = require("./doFetch");
const { getMetadata, putMetadata } = require("./dynamo");


exports.checkTourneyCount = async (source) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;
    const tourneys = await doFetch(endpoint, source);
    const tourneyCount = tourneys.reduce((lv, cv) => {
        if (cv.tournament.state === 'complete') {
            lv += 1;
        }
        return lv;
    }, 0);
    console.log(`Tournament count check, ${source}: ${tourneyCount}`);
    return tourneyCount;
};
