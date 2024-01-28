import { apiSource, iMatch, iParticipant, iTournament } from "../../src-shared/types";

import { DYNAMO, CHALLONGE } from "../../src-shared/constants";
import { apiKey } from "../creds";
import { dyMockApiPut, dyMockApiGet } from "./dynamo";

const genUrl = (endpoint: string) => {
    const suffix = endpoint.indexOf('?') === -1 ? '?' : '&';
    const auth = `${suffix}api_key=${apiKey}`;
    const ret = 'https://api.challonge.com/v1/' + endpoint + auth;
    console.log(ret);
    return ret;
}



// If we can map endpoint strings to responses, we could do this
// export const doFetch = async <String>(endpoint: string, source: apiSource): Promise<iChallongeResp['tournaments']> => 
// But leaving generic for now
const doFetch = async (endpoint: string, source: apiSource) => {
    if (source === DYNAMO) {
        return await dyMockApiGet(endpoint)

    } else if (source === CHALLONGE) {
        const url = genUrl(endpoint);
        const resp = await fetch(url);
        const respJson = await resp.json();
        await dyMockApiPut(endpoint, respJson)
        return respJson as iTournament[];
    }
    else {
        throw new Error(`Unknown source ${source}`);
    }
};

// Fetch tournament data from challonge API (or a clone of this API)
export const fetchTournies = async (endpoint: string, source: apiSource) => {
    if (endpoint.indexOf('tournaments') === -1) {
        throw Error(`Trying to fetch tournaments from wrong endpoint ${endpoint} `);
    }
    return await doFetch(endpoint, source) as iTournament[];
};

// Fetch participant data from challonge API (or a clone of this API)
export const fetchParticipants = async (endpoint: string, source: apiSource) => {
    if (endpoint.indexOf('participants') === -1) {
        throw Error(`Trying to fetch participants from wrong endpoint ${endpoint} `);
    }
    return await doFetch(endpoint, source) as iParticipant[];
};

// Fetch match data from challonge API (or a clone of this API)
export const fetchMatches = async (endpoint: string, source: apiSource) => {
    if (endpoint.indexOf('matches') === -1) {
        throw Error(`Trying to fetch matches from wrong endpoint ${endpoint} `);
    }
    return await doFetch(endpoint, source) as iMatch[];
};