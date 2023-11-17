import { podiumLookup } from "../../src-shared/constants";
import { cleanedNames, iParticipant, iStatStore, iTournament } from "../../src-shared/types";

export const parsePodium = (statStoreIn: iStatStore, participants: iParticipant[], cleanedNames: cleanedNames, tourney: iTournament) => {
    let statStore = Object.assign({}, statStoreIn);
    const finishesRef = statStore['podiumFinishes'];
    const tournament: iTournament = {
        ...tourney,
    };
    const rankedParticRef: string[][] = [];

    for (const el of participants) {
        const participant = el.participant;
        const rank = participant.final_rank;
        const lookup = podiumLookup;
        const cleanName = cleanedNames[participant.id];
        // NEXT TODO - test this in a unit test
        if (rank in rankedParticRef) {
            rankedParticRef[rank].push(cleanName);
        } else {
            rankedParticRef[rank] = [cleanName];
        }
        if (rank in lookup) {
            const result = lookup[rank];

            if (cleanName in finishesRef[result]) {
                finishesRef[result][cleanName] += 1;
            } else {
                finishesRef[result][cleanName] = 1;
            }
        }
    }
    tournament.tournament.rankedParticipants = rankedParticRef;
    return statStore;
};

export const prettifyPodium = (statStoreIn: iStatStore) => {
    const statStore = Object.assign({}, statStoreIn);
    const finishesRef = statStore['podiumFinishes'];
    const podiumNames = Object.values(podiumLookup);
    let ret = '';
    for (const podiumName of podiumNames) {
        ret += podiumName;
        ret += '\n';
        const players = finishesRef[podiumName];
        const playersArr = Object.keys(players).map(
            el => `${el}: ${players[el]}`
        );

        playersArr.sort((a, b) =>
            a.split(':')[1] > b.split(':')[1] ? -1 : 1
        );
        for (const player of playersArr) {
            ret += player;
            ret += '\n';
        };
        ret += '\n\n';
    }
    return ret;
};