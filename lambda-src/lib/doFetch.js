const { getIsTesting, DYNAMO, CHALLONGE } = require("../constants/constants.js");
const { apiKey } = require("../creds.js");
const { mockApiPut, mockApiGet } = require("./dynamo.js");
genUrl = (endpoint) => {
    const suffix = endpoint.indexOf('?') === -1 ? '?' : '&';
    const auth = `${suffix}api_key=${apiKey}`;
    const ret = 'https://api.challonge.com/v1/' + endpoint + auth;
    console.log(ret);
    return ret;
}




exports.doFetch = async (endpoint, source) => {
    if (source === DYNAMO) {
        return await mockApiGet(endpoint)

    } else if (source === CHALLONGE) {
        const url = genUrl(endpoint);
        const resp = await fetch(url);
        const respJson = await resp.json();
        await mockApiPut(endpoint, respJson)
        return respJson;
    }
    else {
        throw new Error(`Unknown source ${source}`);
    }
};