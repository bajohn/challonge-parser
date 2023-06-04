import { podiumLookup } from "./constants.js";

export const prettifyPodiumFinishes = (statStoreIn) => {
    const statStore = Object.assign({}, statStoreIn);
    const finishesRef = statStore['podiumFinishes'];
    const podiumNames = Object.values(podiumLookup());
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

export const checkSum = (statStoreIn) => {
    const statStore = Object.assign({}, statStoreIn);
    const finishesRef = statStore['podiumFinishes'];
    for (const finishers of Object.values(finishesRef)) {
        const result = Object.values(finishers).reduce((lv, cv) => {
            return lv + cv;
        }, 0);
        console.log(`Checksum value ${result}`);
    }
}

