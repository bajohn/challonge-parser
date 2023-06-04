import { cleanName } from "../constants/cleanName.js";
import { genUrl } from "./genUrl.js";
import { parseh2h } from "./h2h.js";
import { parsePodium } from "./podium.js";

export const parseMatches = async (tourney, statStoreIn) => {
    let statStore = Object.assign({}, statStoreIn);
    const tourneyId = tourney.tournament.id;
    const matches = await getMatches(tourneyId);
    const participants = await getParticipants(tourneyId);
    const cleanedNames = await cleanNames(participants);

    // statStore = parsePodium(statStore, participants, cleanedNames);
    statStore = parseh2h(statStore, matches, participants);
    return statStore;
}

const getMatches = async (tourneyId) => {
    const endpoint = `tournaments/${tourneyId}/matches.json`;
    const matchUrl = genUrl(endpoint);
    const resp = await fetch(matchUrl);
    const matches = await resp.json();
    return matches;
}

const getParticipants = async (tourneyId) => {
    const endpoint = `tournaments/${tourneyId}/participants.json`;
    const participantUrl = genUrl(endpoint);
    const resp = await fetch(participantUrl);
    const participants = await resp.json();
    return participants
}

const cleanNames = async (participants) => {
    const ret = participants.reduce((lv, cv) => {
        const id = cv.participant.id;
        const name = cleanName(cv.participant.name);
        lv[id] = name;
        return lv;
    }, {})
    return ret;
};
