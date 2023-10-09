const { SUBDOMAIN } = require("../constants/constants");
const { doFetch } = require("./doFetch");
const { getMetadata, putMetadata } = require("./dynamo");


exports.checkTourneyCount = async (source) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;
    const tourneys = await doFetch(endpoint, source);
    const ret = tourneys.length;
    console.log(`Tournament count: ${ret}`);
    return ret;
};
