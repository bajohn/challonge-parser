import { rootUrl } from './constants';

export const playerGetter = async (setPlayers: any) => {

    const resp = await fetch(`${rootUrl}get-players`)
    const jsonResp = await resp.json();
    const players = jsonResp.players;
    players.map((el: any) => {
        const num = el['w'] / (el['w'] + el['l']) * 100;
        el['pct'] = num;
        el['pctPretty'] = Number(num.toLocaleString('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }));
        return el;
    });
    players.sort((a: any, b: any) => {
        if (a['pct'] === b['pct']) {
            if (a['w'] === b['w']) {
                return a['l'] < b['l'] ? -1 : 1
            }
            return a['w'] > b['w'] ? -1 : 1
        }
        return a['pct'] > b['pct'] ? -1 : 1;
    });
    setPlayers(players);
}

export const podiumGetter = async (setPodium: any) => {
    const resp = await fetch(`${rootUrl}podium-finishes`)
    const jsonResp = await resp.json();
    const podiums = jsonResp.data;
    console.log(podiums)
    setPodium(podiums);
}

export const reloadDynamo = async () => {
    const resp = await fetch(`${rootUrl}reload-dynamo`, {
        method: 'POST'
    });
    const respJson = await resp.json()
    console.log(respJson);
}

export const checkUpdateStatus = async () => {
    const resp = await fetch(`${rootUrl}get-update-status`, {
        method: 'GET'
    });
    return await resp.json();
}