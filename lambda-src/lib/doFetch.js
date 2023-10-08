const { getIsTesting } = require("../constants/constants.js");
const { apiKey } = require("../creds.js");
const { putApiResp } = require("./dynamo.js");
genUrl = (endpoint) => {
    const suffix = endpoint.indexOf('?') === -1 ? '?' : '&';
    const auth = `${suffix}api_key=${apiKey}`;
    const ret = 'https://api.challonge.com/v1/' + endpoint + auth;
    console.log(ret);
    return ret;
}




exports.doFetch = async (endpoint) => {
    // for dev - store in dynamo?
    const storeResults = true;

    const url = genUrl(endpoint);

    const resp = await fetch(url);
    const respJson = await resp.json();
    if (storeResults) {
        await putApiResp(endpoint, respJson)
    }
    return respJson;
};