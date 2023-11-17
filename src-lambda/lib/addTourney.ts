import { apiSource, iParticipant, iStatStore, iTournament } from "../../src-shared/types";

import { cleanName } from "../constants/cleanName";
import { fetchMatches, fetchParticipants } from "./doFetch";
import { parseH2H } from "./h2h";
import { parsePodium } from "./podium";
import { recordTourneyMeta } from "./recordTourneyMeta";

export const addTourneyToStatStore = async (
    tourney: iTournament,
    statStoreIn: iStatStore,
    source: apiSource) => {
    let statStore = Object.assign({}, statStoreIn);
    const tourneyId = tourney.tournament.id;
    const matches = await getMatches(tourneyId, source);
    const participants = await getParticipants(tourneyId, source);
    const cleanedNames = await cleanNames(participants);

    statStore = parsePodium(statStore, participants, cleanedNames, tourney);
    statStore = parseH2H(statStore, matches, participants);
    return statStore;
};

const getMatches = async (tourneyId: string, source: apiSource) => {
    const endpoint = `tournaments/${tourneyId}/matches.json`;
    const matches = await fetchMatches(endpoint, source);
    return matches;
}

const getParticipants = async (tourneyId: string, source: apiSource) => {
    const endpoint = `tournaments/${tourneyId}/participants.json`;
    const participants = await fetchParticipants(endpoint, source);
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
