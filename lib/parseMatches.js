import { cleanName } from "./cleanName.js";
import { podiumLookup } from "../constants/constants.js";
import { genUrl } from "./genUrl.js";

export const parseMatches = async (tourney, statStoreIn) => {
    let statStore = Object.assign({}, statStoreIn);
    const tourneyId = tourney.tournament.id;
    const matches = await getMatches(tourneyId);
    const participants = await getParticipants(tourneyId);
    const cleanedNames = await cleanNames(participants);

    statStore = podiumFinishes(statStore, participants, cleanedNames);
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

const podiumFinishes = (statStoreIn, participants, cleanedNames) => {
    let statStore = Object.assign({}, statStoreIn);
    if (!('podiumFinishes' in statStore)) {
        statStore['podiumFinishes'] = Object.values(podiumLookup()).reduce(
            (lv, cv) => {
                lv[cv] = {};
                return lv;
            }, {});
    }
    const finishesRef = statStore['podiumFinishes'];
    for (const el of participants) {
        const participant = el.participant;
        const rank = participant.final_rank;
        const lookup = podiumLookup();
        if (rank in lookup) {
            const result = lookup[rank];
            const cleanName = cleanedNames[participant.id];
            if (cleanName in finishesRef[result]) {
                finishesRef[result][cleanName] += 1;
            } else {
                finishesRef[result][cleanName] = 1;
            }
        }
    }
    return statStore;

}

