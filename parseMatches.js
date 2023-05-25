import { genUrl } from "./genUrl.js";

export const parseMatches = async (tourney) => {
    const tourneyId = tourney.tournament.id;
    const matches = await getMatches(tourneyId);
    const players = await getPlayers(tourneyId);
    console.log(players);
    // cleanName('test')
}

const getMatches = async (tourneyId) => {
    const endpoint = `tournaments/${tourneyId}/matches.json`;
    const matchUrl = genUrl(endpoint);
    const resp = await fetch(matchUrl);
    const matches = await resp.json();
    return matches;
}


const getPlayers = async (tourneyId) => {
    const endpoint = `tournaments/${tourneyId}/participants.json`;
    const participantUrl = genUrl(endpoint);
    const resp = await fetch(participantUrl);
    const players = await resp.json();
    return players;
}
