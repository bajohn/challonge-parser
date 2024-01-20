import React, { useEffect, useState } from 'react';
import { rootUrl } from './constants';

export const playerGetter = async (setPlayers: React.SetStateAction<any>) => {

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
};

export const tourneyGetter = async (setTourneys: any) => {
    const resp = await fetch(`${rootUrl}get-tourneys`)
    const jsonResp = await resp.json();
    const tourneys = jsonResp.tournaments;
    console.log(tourneys);
    setTourneys(tourneys);
};

export const podiumGetter = async (setPodium: any) => {
    const resp = await fetch(`${rootUrl}podium-finishes`)
    const jsonResp = await resp.json();
    const podiums = jsonResp;
    setPodium(podiums);
}

export const reloadDynamo = async () => {
    const resp = await fetch(`${rootUrl}challonge-full-reload`, {
        method: 'POST'
    });
    const respJson = await resp.json()
    console.log(respJson);
}

export const checkUpdateStatus = async (checkType: string) => {
    const resp = await fetch(`${rootUrl}update-status/${checkType}`, {
        method: 'GET'
    });
    return await resp.json();
}