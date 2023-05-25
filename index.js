import { cleanName } from "./cleanName.js";
import { genUrl } from "./genUrl.js";
import { parseMatches } from "./parseMatches.js";


const main = async () => {
    console.log('start');

    const subdomain = 'b71fc01980b13ee66eab1849';
    const endpoint = `tournaments.json?subdomain=${subdomain}`;
    const tourneyUrl = genUrl(endpoint);

    const resp = await fetch(tourneyUrl);
    const tourneys = await resp.json()
    for (const tourney of tourneys) {
        console.log(tourney.tournament.name);
        parseMatches(tourney);
        break;
    }
    console.log(tourneys.length)
}



main();