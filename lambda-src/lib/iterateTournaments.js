const { genUrl } = require("./genUrl.js");
const { parseMatches } = require( "./parseMatches.js");




// Iterate through all tournaments, 
// returning statStore
exports.doIterate = async () => {
    const subdomain = 'b71fc01980b13ee66eab1849';
    const endpoint = `tournaments.json?subdomain=${subdomain}`;
    const debug = true;
    const tourneyUrl = genUrl(endpoint);

    const resp = await fetch(tourneyUrl);
    console.log(resp);
    const tourneys = await resp.json();
    console.log(`Tournament count: ${tourneys.length}`);
    let statStore = {};

    statStore = await iterate(tourneys, statStore, debug);
    return statStore;
};

const iterate = async (tourneys, statStoreIn, debug = false) => {
    let statStore = Object.assign({}, statStoreIn);
    let counter = 1;
    for (const tourney of tourneys) {
        // console.log(tourney.tournament.name);
        statStore = await parseMatches(tourney, statStore);
        if (debug) {
            counter += 1;
            if (counter > 3) {
                break;
            }
        }
    }
    return statStore;
};