import { cleanName } from "./constants/cleanName.js";
import { genUrl } from "./lib/genUrl.js";
import { parseMatches } from "./lib/parseMatches.js";


const main = async () => {
    const subdomain = 'b71fc01980b13ee66eab1849';
    const endpoint = `tournaments.json?subdomain=${subdomain}`;
    const tourneyUrl = genUrl(endpoint);

    const resp = await fetch(tourneyUrl);
    const tourneys = await resp.json();
    console.log(`Tournament count: ${tourneys.length}`);
    let statStore = {};

    statStore = await iterate(tourneys, statStore, true);
    console.log('end', statStore);

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


main();