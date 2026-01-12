import { iH2h, iMatch, iParticipant, iStatStore, iTournament } from "../../src-shared/types";

import { cleanName, findCleanName } from "../constants/cleanName";

// Update the h2h stats for all the matches
// of a single tournament.
// Only store first name, second name alphabetically, ie 
//     a   b   c 
// a   x   1   1
// b   0   x   1
// c   0   0   x
export const parseH2H = (statStoreIn: iStatStore, 
    tourney: iTournament,
    matches: iMatch[], 
    participants: iParticipant[]) => {
    let statStore = Object.assign({}, statStoreIn);

    // Object should be initialized already
    // if (!('h2h' in statStore)) {
    //     statStore['h2h'] = {};
    // }
    const h2h = statStore['h2h'];
    for (const el of matches) {
        const match = el['match'];
        const player1Name = findCleanName(match['player1_id'], participants);
        const player2Name = findCleanName(match['player2_id'], participants);
        const winnerName = findCleanName(match['winner_id'], participants);
        
        updateH2H2wl(player1Name, player2Name, winnerName, tourney, h2h);
        updateH2H2wl(player2Name, player1Name, winnerName, tourney, h2h);
    }

    for (const keyName of Object.keys(h2h)) {
        const curRef = h2h[keyName];
        for (const inner of Object.keys(h2h)) {
            if (!(inner in curRef)) {
                curRef[inner] = { w: 0, l: 0 };
            }
        }
    }
    prettifyH2H(statStore);
    return statStore;
};

const updateH2H2wl = (
    player1Name: string, 
    player2Name: string, 
    winnerName: string, 
    tournament: iTournament,
    h2h: iH2h) => {
    if (!(player1Name in h2h)) {
        h2h[player1Name] = {};
    }
    if (!(player2Name in h2h[player1Name])) {
        h2h[player1Name][player2Name] = {
            w: 0,
            l: 0
        };
    };

    const resultRef = h2h[player1Name][player2Name];

    if (winnerName === player1Name) {
        resultRef['w'] += 1;
    } else {
        resultRef['l'] += 1;
    }
    resultRef
}


const prettifyH2H = (statStoreIn: iStatStore) => {
    const statStore = Object.assign({}, statStoreIn);
    const h2hRef = statStore['h2h'];
    const keys = Object.keys(h2hRef).sort();
    let header = uniformCell('');
    for (const keyPlayer of keys) {
        header += uniformCell(keyPlayer);
    }
    for (const keyPlayer of keys) {
        const rowRef = h2hRef[keyPlayer];
        let lineToPrint = uniformCell(keyPlayer);
        for (const oppon of keys) {
            const cellRef = rowRef[oppon];
            if (oppon < keyPlayer) {
                lineToPrint += uniformCell('')
            } else {
                lineToPrint += uniformCell(`${cellRef['w']}-${cellRef['l']}`);
            }
        }
    }
}

const uniformCell = (str: string) => {
    let ret = str.trim();
    const cellSize = 10;
    const spacingSize = cellSize - ret.length;
    for (let i = 0; i < spacingSize; i++) {
        ret += ' ';
    }
    return ret;
}

export const getAllNames = (statStore: iStatStore) => {
    return Object.keys(statStore.h2h).sort()
}