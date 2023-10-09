const { doFetch } = require("./doFetch.js");
const { addTourneyToStatStore } = require("./addTourney.js");
const { SUBDOMAIN } = require("../constants/constants.js");




// Iterate through all tournaments, 
// returning statStore
exports.generateStatStore = async (source) => {
    const endpoint = `tournaments.json?subdomain=${SUBDOMAIN}`;
    const debug = false;

    const tourneys = await doFetch(endpoint, source);
    console.log(`Tournament count: ${tourneys.length}`);
    let statStore = {};

    statStore = await iterate(tourneys, statStore, source, debug);
    return statStore;
};

const iterate = async (tourneys, statStoreIn, source, debug = false) => {
    let statStore = Object.assign({}, statStoreIn);
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