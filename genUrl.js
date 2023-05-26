import { apiKey } from "./creds.js";
export const genUrl = (endpoint) => {
    const userName = 'bjohn454';
    const suffix = endpoint.indexOf('?') === -1 ? '?' : '&';
    const auth = `${suffix}api_key=${apiKey}`;
    const ret = 'https://api.challonge.com/v1/' + endpoint + auth;
    console.log(ret);
    return ret;
}