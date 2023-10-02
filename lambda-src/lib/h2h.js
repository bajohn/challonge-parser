const { cleanName, findCleanName } = require("../constants/cleanName.js");

// Update the h2h stats for all the matches
// of a single tournament.
// Only store first name, second name alphabetically, ie 
//     a   b   c 
// a   x   1   1
// b   0   x   1
// c   0   0   x
exports.parseH2H = (statStoreIn, matches, participants) => {
    let statStore = Object.assign({}, statStoreIn);

    if (!('h2h' in statStore)) {
        statStore['h2h'] = {};
    }
    const h2h = statStore['h2h'];
    for (const el of matches) {
        const match = el['match'];
        const player1Name = findCleanName(match['player1_id'], participants);
        const player2Name = findCleanName(match['player2_id'], participants);

        const winnerName = findCleanName(match['winner_id'], participants);
        const sorted = [player1Name, player2Name].sort();

        const keyName = sorted[0];
        const nonKeyName = sorted[1];

        if (!(keyName in h2h)) {
            h2h[keyName] = {};
        }
        if (!(nonKeyName in h2h[keyName])) {
            h2h[keyName][nonKeyName] = {
                w: 0,
                l: 0
            };
        };
        const resultRef = h2h[keyName][nonKeyName];

        if (winnerName === keyName) {
            resultRef['w'] += 1;
        } else {
            resultRef['l'] += 1;
        }
    }

    for (const keyName of Object.keys(h2h)) {
        const curRef = h2h[keyName];
        for (const inner of Object.keys(h2h)) {
            // Optional: add x/x for player's self
            // if (keyName === inner) {
            //     curRef[inner] = { w: 'x', l: 'x' }
            // } else 
            if (!(inner in curRef)) {
                curRef[inner] = { w: 0, l: 0 };
            }
        }
    }
    prettifyH2H(statStore);
    return statStore;
};



const prettifyH2H = (statStoreIn) => {
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

const uniformCell = (str) => {
    let ret = str.trim();
    const cellSize = 10;
    const spacingSize = cellSize - ret.length;
    for (let i = 0; i < spacingSize; i++) {
        ret += ' ';
    }
    return ret;
}

exports.getAllNames = (statStore) => {
    return Object.keys(statStore.h2h).sort()
}