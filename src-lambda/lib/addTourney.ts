import { apiSource, iParticipant, iStatStore } from "./types";

const { cleanName } = require("../constants/cleanName.js");
const { doFetch } = require("./doFetch.js");
const { parseH2H } = require("./h2h.js");
const { parsePodium } = require("./podium.js");

export const addTourneyToStatStore = async (
    tourneyId: string,
    statStoreIn: iStatStore,
    source: apiSource) => {
    let statStore = Object.assign({}, statStoreIn);

    const matches = await getMatches(tourneyId, source);
    const participants = await getParticipants(tourneyId, source);
    const cleanedNames = await cleanNames(participants);

    statStore = parsePodium(statStore, participants, cleanedNames);
    statStore = parseH2H(statStore, matches, participants);
    return statStore;
};

const getMatches = async (tourneyId: string, source: apiSource) => {
    const endpoint = `tournaments/${tourneyId}/matches.json`;
    const matches = await doFetch(endpoint, source);
    return matches;
}

const getParticipants = async (tourneyId: string, source: apiSource) => {
    const endpoint = `tournaments/${tourneyId}/participants.json`;
    const participants = await doFetch(endpoint, source);
    return participants
}

const cleanNames = async (participants: iParticipant[]) => {
    const ret = participants.reduce((lv, cv) => {
        const id = cv.participant.id;
        const name = cleanName(cv.participant.name);
        lv[id] = name;
        return lv;
    }, {} as { [index: number]: string })
    return ret;
};
