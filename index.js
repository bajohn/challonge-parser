import { cleanName } from "./cleanName.js";
import { checkSum, prettifyPodiumFinishes } from "./finalUtils.js";
import { genUrl } from "./genUrl.js";
import { parseMatches } from "./parseMatches.js";


const main = async () => {
    console.log('start');

    const subdomain = 'b71fc01980b13ee66eab1849';
    const endpoint = `tournaments.json?subdomain=${subdomain}`;
    const tourneyUrl = genUrl(endpoint);

    const resp = await fetch(tourneyUrl);
    const tourneys = await resp.json();
    console.log(`Tournament count: ${tourneys.length}`);
    let statStore = {};
    let counter = 0;
    for (const tourney of tourneys) {
        // console.log(tourney.tournament.name);
        statStore = await parseMatches(tourney, statStore);
        // counter += 1;
        // if (counter > 5) {
        //     break;
        // }
    }
    // console.log(statStore);
    console.log(prettifyPodiumFinishes(statStore));
    checkSum(statStore);
}


main();