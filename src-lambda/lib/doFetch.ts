import { apiSource, iTournament } from "./types";

const { getIsTesting, DYNAMO, CHALLONGE } = require("../constants/constants.js");
const { apiKey } = require("../creds.js");
const { mockApiPut, mockApiGet } = require("./dynamo.js");

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
export const doFetch = async (endpoint: string, source: apiSource): Promise<iTournament[]> => {
    if (source === DYNAMO) {
        return await mockApiGet(endpoint)

    } else if (source === CHALLONGE) {
        const url = genUrl(endpoint);
        const resp = await fetch(url);
        const respJson = await resp.json();
        await mockApiPut(endpoint, respJson)
        return respJson as iTournament[];
    }
    else {
        throw new Error(`Unknown source ${source}`);
    }
};