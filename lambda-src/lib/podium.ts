import { podiumLookup } from "../constants/constants";

exports.parsePodium = (statStoreIn: iStatStore, participants: iParticipant[], cleanedNames: cleanedNames) => {
    let statStore = Object.assign({}, statStoreIn);
    // Should be initialized on input, so we don't need this anymore
    // if (!('podiumFinishes' in statStore)) {
    //     statStore['podiumFinishes'] = Object.values(podiumLookup()).reduce(
    //         (lv, cv) => {
    //             lv[cv] = {};
    //             return lv;
    //         }, {});
    // }
    const finishesRef = statStore['podiumFinishes'];
    for (const el of participants) {
        const participant = el.participant;
        const rank = participant.final_rank;
        const lookup = podiumLookup;
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
};

exports.prettifyPodium = (statStoreIn: iStatStore) => {
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