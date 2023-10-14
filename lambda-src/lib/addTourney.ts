const { cleanName } = require("../constants/cleanName.js");
const { doFetch } = require("./doFetch.js");
const { parseH2H } = require("./h2h.js");
const { parsePodium } = require("./podium.js");

exports.addTourneyToStatStore = async (tourneyId, statStoreIn, source) => {
    let statStore = Object.assign({}, statStoreIn);

    const matches = await getMatches(tourneyId, source);
    const participants = await getParticipants(tourneyId, source);
    const cleanedNames = await cleanNames(participants);

    statStore = parsePodium(statStore, participants, cleanedNames);
    statStore = parseH2H(statStore, matches, participants);
    return statStore;
};

const getMatches = async (tourneyId, source) => {
    const endpoint = `tournaments/${tourneyId}/matches.json`;
    const matches = await doFetch(endpoint, source);
    return matches;
}

const getParticipants = async (tourneyId, source) => {
    const endpoint = `tournaments/${tourneyId}/participants.json`;
    const participants = await doFetch(endpoint, source);
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
